export function success(res, status, message, data = null) {
  return res.status(status).json({
    success: true,
    message,
    data,
  })
}

export function failure(res, status, message, details = null) {
  return res.status(status).json({
    success: false,
    error: message,
    details,
  })
}
