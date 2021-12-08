// -- Prismic Repo Name
export const repoName = 'ignews2pahique'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.prismic.io/api/v2`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = 'MC5ZWkcwQUJFQUFDQUFLNFZE.cu-_ve-_vUtvAyoGPnzvv73vv73vv73vv73vv71d77-9GFA3YALvv73vv73vv73vv73vv70PJ--_ve-_ve-_vQ'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  return '/'
}

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
  routes: [
    {
      "type":"post",
      "path":"/:uid"
    },
  ]
};