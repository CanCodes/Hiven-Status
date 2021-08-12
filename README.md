![img](./assets/code/HivenSpotify.png)

# Hiven Status Header

This small project let's you display your status on your Hiven Header image using the Lanyard API. Make sure you are in [Lanyard Discord Server](https://discord.gg/UrXF2cfJ7F).

## Configuring

1. Create a `.env` file referencing the `.example.env`
2. Install node packages.
3. Build the project using the build script.
4. Run the start script using your prefered package manager (yarn/npm)
5. You can change the background from `assets/user/background.png`. It would be better if the image is 1000x500, though I had no issues with 1920x1080.

## Want to add a new App to show on your status?

1. Add the app icon in the `assets/code/icons` as a png and **make sure it's 150x150**
2. Add the app in `src/apps.json` using this schema:

```json
    "App Name That Gets Returned From Discord/Lanyard": {
      "topText": "",
      "midText": "",
      "botText": "",
      "iconName": "app.png"
  }
```

3. You can use `{name} | {state} | {details}` in the json file to make the app status more dynamic.
4. Save, test and create a PR!

## Troubleshooting

**Q: Canvas build is not passing**\
**A:** It's probably due to your OS or processor architecture not being supported (Like M1). I solved it by downloading [these dependencies](https://github.com/Automattic/node-canvas#compiling).

## Special Thanks To

- TheHacerCoding

for their contribution.
