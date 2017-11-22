Install all dependencies

```shell
yarn
```

Create a `.env` file that sets the WebDAV environment variables:

```shell
!#/bin/sh
export WEBDAV_USER = '…'
export WEBDAV_PASSWORD = '…'
export WEBDAV_URL = '…'
export WEBDAV_PATH = '…'
```

Set the environment variables:

```shell
source .env
```

Run the application:

```shell
yarn start
```
