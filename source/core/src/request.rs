use crate::response::create_response_object;
use reqwest::Client;
use serde_wasm_bindgen::from_value;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub async fn http_request(
    method: &str,
    url: &str,
    options: JsValue,
    user_agent: &str,
) -> Result<JsValue, JsValue> {
    let client = Client::new();

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

    let response = request
        .send()
        .await
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let status = response.status().as_u16();
    let headers = response.headers().clone();
    let final_url = response.url().as_str().to_string();
    let body = response
        .text()
        .await
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let new_options =
        from_value::<serde_json::Value>(options).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let body_used = new_options.get("body").is_some();

    create_response_object(
        status, headers, body, url, &final_url, user_agent, body_used,
    )
}
