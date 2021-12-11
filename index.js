const Discord = require("discord.js");
const config = require("./config.json");

// Crée un nouveau "Discord.Client" et l'attribue au client constant. Ce client permet en partie d'interagir avec l'API Discord et de s'informer des événements tels que l'arrivée de nouveaux messages. Le client, en effet, représente le bot Discord.
const client = new Discord.Client();

// Attribuer la valeur « ! » au prefix de la constante qui sera utilisée comme préfixe du bot.
const prefix = "!";

client.on("message", function (message) {
  // Vérifie si l'auteur du message est un bot, et si c'est le cas, arrête le traitement de la commande.
  if (message.author.bot) return;

  // Vérifie si le contenu du message que le bot traite commence par le préfixe défini, et si ce n'est pas le cas, empêche la poursuite du traitement du message.
  if (!message.content.startsWith(prefix)) return;

  // Supprime le préfixe du contenu du message et attribue le résultat à la constante "commandBody"
  const commandBody = message.content.slice(prefix.length);
  // Assigne un tableau (constante "args") en séparant la chaîne de caractères où il y a des espaces
  const args = commandBody.split(" ");

  // Supprime le premier élément du tableau ar"gs (qui est le nom de la commande fournie), le convertit en minuscules, puis l'affecte à la constante "command"
  const command = args.shift().toLowerCase();

  // Vérifie si le nom de commande analysé (attribué à la constante "command") correspond à "ping"
  if (command === "ping") {
    // Calcule la différence entre l'heure actuelle - trouvée en utilisant la méthode "now" sur l'objet "Date" - et l'heure de création du message (en millisecondes)
    const timeTaken = Date.now() - message.createdTimestamp;

    // Répond à la commande de l'utilisateur en utilisant la méthode "reply" sur la constante "message" (NOTE: La méthode "reply" envoie un ping à l'utilisateur qui a invoqué la commande (ce qui avertit l'utilisateur et met en évidence le message pour l'utilisateur spécifié), suivi du contenu fourni comme premier argument de la méthode )
    message.reply(`Pong! Ce message a une latence de ${timeTaken}ms.`);

    // Si le nom de commande analysé correspond à "sum"
  } else if (command === "sum") {
    // Utilise la méthode "map" sur la liste des arguments pour créer une nouvelle liste en utilisant la fonction "parseFloat" sur chaque élément du tableau "args". Cela crée un nouveau tableau (attribué à la constante "numArgs") dans lequel tous les éléments sont des nombres au lieu de chaînes de caractères.
    const numArgs = args.map((x) => parseFloat(x));

    // Utilise la méthode "reduce" sur la constante "numArgs", fournissant une fonction qui totalise tous les éléments de la liste. Attribue la somme de tous les éléments de "numArgs" à la constante "sum".
    const sum = numArgs.reduce((counter, x) => (counter += x));

    // Utilise la méthode "reply" sur l'objet du message pour répondre à la commande de l'utilisateur, qui contient la somme de tous les arguments que l'utilisateur envoie au bot.
    message.reply(`La somme de tous les arguments passés est : ${sum}!`);
  }
});

// Utilise la méthode "login" sur le client pour se connecter au bot Discord créé, en utilisant le jeton du fichier "config.json" comme mot de passe. Le jeton permet à l'API Discord de savoir à quel bot le programme est destiné et qu'on a été authentifié pour utiliser le bot.
client.login(config.BOT_TOKEN);

// -------------------------------------------------------
// NOTE : En exécutant « node index.js », le statut du bot passe à 'online' dans le serveur Discord auquel il a été ajouté.
// NOTE 2 : Fonctionne avec NodeJS version 16.13.0
// -------------------------------------------------------
