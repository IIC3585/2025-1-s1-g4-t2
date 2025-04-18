# Descripción

Este repositorio contiene una aplicación que permite subir imágenes y aplicarles diversos filtros. La aplicación se desarrolló como un ejercicio para experimentar con la creación de una aplicación web progresiva (PWA) que utiliza módulos WASM para el procesamiento de imágenes.

# App

La aplicación fue deployeada usando Github Pages, y se puede acceder a ella a través del siguiente link: https://iic3585.github.io/2025-1-s1-g4-t2/

# Cómo ejecutar en local

1) Instalar [Rust](https://www.rust-lang.org/tools/install) y [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
2) Desde la carpeta ``img_processor``, ejecutar el comando:
```
wasm-pack build --target web
```
3) Desde la carpeta base, ejecutar los comandos:
```
npm install
npm run dev
```
4) Acceder a la app en http://localhost:5173/2025-1-s1-g4-t2/
