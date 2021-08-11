![img](./assets/code/HivenSpotify.png)

# Hiven Status Header

This small project let's you display your status on your Hiven Header image using the Lanyard API. Make sure you are in [Lanyard Discord Server](https://discord.gg/UrXF2cfJ7F).


**NOTE: Currently only supports Spotify. More coming soon.**

## Configuring

1. Create a `.env` file using the `.example.env`
2. Install node packages.
3. Build it.
4. Run the start script using your prefered package manager (yarn/npm)
5. You can change the background from `assets/user/background.png`. It would be better if the image is 1000x500, though I had no issues with 1920x1080.

## Troubleshooting

**Q: Canvas build is not passing**\
**A: It's probably due to your OS or processor architecture not being supported (Like M1). I solved it by downloading [these dependencies](https://github.com/Automattic/node-canvas#compiling).**

## To Do

- [x] Spotify Status
- [ ] VSCode Status
