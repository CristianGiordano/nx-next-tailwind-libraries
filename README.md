# NX with NextJS + Multiple tailwind configurations

The ideal solution would be to enable multiple packages to have their own tailwind config and bundle the lib as a 
dependency of the applications. The nextjs dev server uses webpack from what I understand and thus the dev loader is 
reaching into the packages/* folders and ignoring the localised tailwind config.

If you inspect the `apps/admin/next.config.js` you will see a custom webpack callback hacky thing inspired from another
developer referenced in the code. If you serve both apps you can see the workaround is successful.

I imagine what needs to happen is a build target should be a requirement of the dev command for the nextjs apps. However 
I am unable to figure out how this works as I cannot get my head around the output paths and rollup / vite to bundle correctly.

### Installation

```
# adding legacy-peer-deps due to the recent eslint changes and nextjs isn't updated yet
# I also didn't have the time to roll it all back etc.
npm i --legacy-peer-deps 
npx nx run-many -t dev
```
