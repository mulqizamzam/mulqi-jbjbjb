# Mulqi JBJBJB — panduan pemula

**Bundle DeepSeek Harness (DSH) `0.2.1-rc.2`**

Mulqi JBJBJB menambahkan skills instruksi untuk pekerjaan software engineering: code review, debugging, implementasi fitur, refactoring, migrasi, desain prompt, dan verifikasi.

## Instalasi cepat

Syarat: Node.js `^22.19.0 || >=24.0.0`, DSH `0.2.1-rc.2`, dan profil DSH dengan Skill Registry.

```bash
node --version
dsh --version
dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

Jika DSH belum tersedia sebagai perintah global:

```bash
npx @deepseek-ai/dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

Ganti `web` dengan nama profil Anda jika berbeda. Ikuti instruksi CLI, lalu buka sesi baru jika diperlukan.

Panduan lengkap ada di [INSTALL_DSH.md](INSTALL_DSH.md). Lihat juga [README.md](README.md) untuk daftar workflow.

## Contoh pemakaian

```text
/mulqi-review Tinjau diff ini dan cari bug konkret serta risiko keamanan.
/mulqi-debug Cari akar penyebab test yang kadang gagal. Jangan edit dulu.
/mulqi-feature Tambahkan pagination dengan acceptance criteria dan regression test.
/mulqi-verify Periksa hasil kerja dan laporkan perintah test yang benar-benar dijalankan.
```

Perintah slash bergantung pada Skill consumer profil DSH. Jika tidak dikenali, minta agent memuat skill bernama tersebut dari katalog skill.

## Isi bundle

- Review dan debugging berdasarkan bukti.
- Implementasi fitur dengan kriteria penerimaan yang jelas.
- Perbaikan bug terarah dan refactoring yang menjaga perilaku.
- Perencanaan migrasi yang dapat diverifikasi dan di-rollback.
- Verifikasi dengan status PASS/FAIL/BLOCKED/NOT RUN.
- Draft Conventional Commit, operasi workspace, desain prompt, serta bantuan penggunaan.

Bundle ini hanya menambahkan instruksi. Bundle tidak memberi izin file/shell/network tambahan, tidak mengubah routing provider, dan tidak menonaktifkan kebijakan DSH.

## Pengembangan

```bash
npm test
npm run validate
python3 scripts/validate.py
python3 scripts/package.py /tmp/mulqi-jbjbjb.zip
```

Pemeriksaan lokal tidak menggantikan smoke test pada runtime DSH `0.2.1-rc.2`.
