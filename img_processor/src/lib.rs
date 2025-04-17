use wasm_bindgen::prelude::*;
use image::{self, ImageFormat}; // Se usa ImageFormat en lugar de ImageOutputFormat.
use std::io::Cursor;

#[wasm_bindgen]
pub fn resize(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let resized = img.resize(width, height, image::imageops::FilterType::Lanczos3);
    let mut buf = Cursor::new(Vec::new());
    resized.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn grayscale(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let gray = img.grayscale();
    let mut buf = Cursor::new(Vec::new());
    gray.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn blur(image_data: &[u8], sigma: f32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let blurred = img.blur(sigma);
    let mut buf = Cursor::new(Vec::new());
    blurred.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn invert(image_data: &[u8]) -> Vec<u8> {
    let mut img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    img.invert();
    let mut buf = Cursor::new(Vec::new());
    img.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn brighten(image_data: &[u8], value: i32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let brightened = img.brighten(value);
    let mut buf = Cursor::new(Vec::new());
    brightened.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn flip_horizontal(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let flipped = image::imageops::flip_horizontal(&img);
    let mut buf = Cursor::new(Vec::new());
    flipped.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn rotate90(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("No se pudo cargar la imagen");
    let rotated = image::imageops::rotate90(&img);
    let mut buf = Cursor::new(Vec::new());
    rotated.write_to(&mut buf, ImageFormat::Png)
        .expect("Error al escribir la imagen");
    buf.into_inner()
}
