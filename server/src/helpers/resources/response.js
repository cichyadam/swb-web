const handleResponse = (data, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    data
  })
}

module.exports = {
  handleResponse
}
