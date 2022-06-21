import { Bot } from "./deps.deno.ts";

export const bot = new Bot(Deno.env.get("TOKEN") || "");

bot.on("message:sticker", (ctx) => {
  if (ctx.message.sticker.premium_animation) {
    return ctx.deleteMessage()
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.error(error);
        console.log("failed to delete");
      });
  }
});

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
