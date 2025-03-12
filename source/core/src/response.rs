use http::StatusCode;
use js_sys::{ArrayBuffer, Object, Promise, Reflect, Uint8Array};
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

pub fn create_response_object(
    status: u16,
    headers: reqwest::header::HeaderMap,
    body: String,
    original_url: &str,
    final_url: &str,
    user_agent: &str,
    body_used: bool,
) -> Result<JsValue, JsValue> {
    let response_obj = Object::new();
    Reflect::set(
        &response_obj,
        &JsValue::from_str("status"),
        &JsValue::from_f64(status as f64),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("ok"),
        &JsValue::from_bool(status >= 200 && status < 300),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("headers"),
        &JsValue::from(headers_to_jsvalue(&headers)?),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("body"),
        &JsValue::from_str(&body),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("redirected"),
        &JsValue::from_bool(original_url != final_url),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("statusText"),
        &JsValue::from_str(
            StatusCode::from_u16(status)
                .unwrap()
                .canonical_reason()
                .unwrap_or("Unknown"),
        ),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("url"),
        &JsValue::from_str(final_url),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("bodyUsed"),
        &JsValue::from_bool(body_used),
    )?;
    Reflect::set(
        &response_obj,
        &JsValue::from_str("userAgent"),
        &JsValue::from_str(user_agent),
    )?;

    let json_body = body.clone();
    let json_fn = Closure::wrap(Box::new(move || {
        let body_clone = json_body.clone();
        let promise = Promise::new(&mut |resolve, reject| {
            match serde_json::from_str::<serde_json::Value>(&body_clone) {
                Ok(json) => resolve
                    .call1(&JsValue::NULL, &to_value(&json).unwrap())
                    .unwrap(),
                Err(err) => reject
                    .call1(&JsValue::NULL, &JsValue::from_str(&err.to_string()))
                    .unwrap(),
            };
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("json"),
        json_fn.as_ref().unchecked_ref(),
    )?;
    json_fn.forget();

    let text_body = body.clone();
    let text_fn = Closure::wrap(Box::new(move || {
        let body_clone = text_body.clone();
        let promise = Promise::new(&mut |resolve, _reject| {
            resolve
                .call1(&JsValue::NULL, &JsValue::from_str(&body_clone))
                .unwrap();
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("text"),
        text_fn.as_ref().unchecked_ref(),
    )?;
    text_fn.forget();

    let clone_response_obj = response_obj.clone();
    let clone_fn = Closure::wrap(Box::new(move || {
        let cloned_response = clone_response_obj.clone();
        JsValue::from(cloned_response)
    }) as Box<dyn FnMut() -> JsValue>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("clone"),
        clone_fn.as_ref().unchecked_ref(),
    )?;
    clone_fn.forget();

    let array_buffer_body = body.clone();
    let array_buffer_fn = Closure::wrap(Box::new(move || {
        let body_clone = array_buffer_body.clone();
        let promise = Promise::new(&mut |resolve, _reject| {
            let array_buffer = ArrayBuffer::new(body_clone.len() as u32);
            let uint8_array = Uint8Array::new(&array_buffer);
            uint8_array.copy_from(&body_clone.as_bytes());
            resolve.call1(&JsValue::NULL, &array_buffer).unwrap();
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("arrayBuffer"),
        array_buffer_fn.as_ref().unchecked_ref(),
    )?;
    array_buffer_fn.forget();

    let blob_body = body.clone();
    let blob_fn = Closure::wrap(Box::new(move || {
        let body_clone = blob_body.clone();
        let promise = Promise::new(&mut |resolve, _reject| {
            let blob = web_sys::Blob::new_with_str_sequence(&js_sys::Array::of1(
                &JsValue::from_str(&body_clone),
            ))
            .unwrap();
            resolve.call1(&JsValue::NULL, &blob).unwrap();
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("blob"),
        blob_fn.as_ref().unchecked_ref(),
    )?;
    blob_fn.forget();

    let form_data_body = body.clone();
    let form_data_fn = Closure::wrap(Box::new(move || {
        let body_clone = form_data_body.clone();
        let promise = Promise::new(&mut |resolve, _reject| {
            let form_data = web_sys::FormData::new().unwrap();
            form_data.append_with_str("body", &body_clone).unwrap();
            resolve.call1(&JsValue::NULL, &form_data).unwrap();
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("formData"),
        form_data_fn.as_ref().unchecked_ref(),
    )?;
    form_data_fn.forget();

    let bytes_body = body.clone();
    let bytes_fn = Closure::wrap(Box::new(move || {
        let body_clone = bytes_body.clone();
        let promise = Promise::new(&mut |resolve, _reject| {
            let uint8_array = Uint8Array::new_with_length(body_clone.len() as u32);
            uint8_array.copy_from(&body_clone.as_bytes());
            resolve.call1(&JsValue::NULL, &uint8_array).unwrap();
        });
        promise
    }) as Box<dyn FnMut() -> Promise>);
    Reflect::set(
        &response_obj,
        &JsValue::from_str("bytes"),
        bytes_fn.as_ref().unchecked_ref(),
    )?;
    bytes_fn.forget();

    Ok(JsValue::from(response_obj))
}

fn headers_to_jsvalue(headers: &reqwest::header::HeaderMap) -> Result<JsValue, JsValue> {
    let headers_obj = Object::new();
    for (key, value) in headers.iter() {
        let key_str = key.as_str();
        let value_str = value
            .to_str()
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        Reflect::set(
            &headers_obj,
            &JsValue::from_str(key_str),
            &JsValue::from_str(value_str),
        )?;
    }
    Ok(JsValue::from(headers_obj))
}
