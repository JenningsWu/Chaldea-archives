let bugsnag = null

function setBugsnagClient(client) {
  bugsnag = client
}

function getBugsnagClient() {
  return bugsnag
}

export { setBugsnagClient, getBugsnagClient }
