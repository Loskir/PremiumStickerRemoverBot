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

bot.chatType('private').command("start", (ctx) => {
  return ctx.reply(`This bot removes premium stickers from the group

To start, add the bot to your group using the button below

Source: github.com/Loskir/PremiumStickerRemoverBot
By: @Loskir`, {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{text: 'Add to group', url: `https://t.me/${ctx.me.username}?startgroup=1&admin=delete_messages`}]
    ]
  }
})
});
