export function info(message: string) {
  console.log(`%cINFO`, "background: #007bff; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;", message);
}

export function error(message: string) {
  console.log(`%cERROR`, "background: #dc3545; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;", message);
}
