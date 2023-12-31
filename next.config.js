/** @type {import('next').NextConfig} */
const path = require('path'); // 1. path 선언
// const nextConfig = {
//     async redirects() {
//         return [{
//             source: '/h',
//             destination: '/home',
//             permanent: true,
//         }, ]
//     },
// }

// module.exports = nextConfig

// const withSass = require('@zeit/next-sass');

// module.exports = withSass({
//     /* bydefault config  option Read For More Optios 
//      here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/

//     cssModules: true
// })

module.exports = {
    reactStrictMode: false,
    async redirects() {
        return [{
            source: '/',
            destination: '/home',
            permanent: true,
        }, ]
    },
    /* Add Your Scss File Folder Path Here */
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}