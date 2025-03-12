use tokio::runtime::Runtime;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub async fn http_request(method: &str, url: &str, options: JsValue) -> Result<JsValue, JsValue> {
    let runtime = Runtime::new().map_err(|e| JsValue::from_str(&e.to_string()))?;
    let client = reqwest::Client::new();

    let request = match method {
        "GET" => client.get(url),
        "POST" => client.post(url),
        "PUT" => client.put(url),
        "DELETE" => client.delete(url),
        "PATCH" => client.patch(url),
        "HEAD" => client.head(url),
        "OPTIONS" => client.request(reqwest::Method::OPTIONS, url),
        "TRACE" => client.request(reqwest::Method::TRACE, url),
        _ => return Err(JsValue::from_str("Invalid HTTP method")),
    };

    let response = runtime.block_on(request.send()).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let status = response.status().as_u16();
    let headers = response.headers().clone();
    let body = response.text().await.map_err(|e| JsValue::from_str(&e.to_string()))?;

    let response_obj = js_sys::Object::new();
    js_sys::Reflect::set(&response_obj, &JsValue::from_str("status"), &JsValue::from_f64(status as f64))?;
    js_sys::Reflect::set(&response_obj, &JsValue::from_str("headers"), &JsValue::from_serde(&headers).unwrap())?;
    js_sys::Reflect::set(&response_obj, &JsValue::from_str("body"), &JsValue::from_str(&body))?;

    Ok(JsValue::from(response_obj))
}
