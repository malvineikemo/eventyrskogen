/*
Konfigurasjon
------------------------
Hvis noe ikke fungerer, vennligst kontakt meg på discord (malvineikemo#1195).
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*Dette er et filnavn for logo i /images/ (Hvis du laster opp ny logo med annet navn, må du endre denne verdien)*/
        serverName: "Eventyrskogen", /*Servernavn*/
        serverIp: "eventyrskogen.net", /*Server IP (hvis du vil legge til online bruker teller, må du ha true på enable-status og enable-query i server.properties)*/
        discordServerID: "1232611050164060222" /*Din server ID (hvis du vil legge til online bruker teller, må du ha aktivert Discord server widget)*/
    },

    /*Stab
    ------------
    Hvis du vil lage en ny gruppe, må du legge til denne strukturen i adminTeamPage:
    <nameOfGroup>: [
        {
            inGameName: "malvineikemo",
            rank: "Utvikler",
            skinUrlOrPathToFile: "",
            rankColor: ""
        },
    ]
    så må du legge til denne gruppen med samme navn i atGroupsDefaultColors og sette fargen du vil ha for gruppen.
    Du kan også sette en spesiell farge for en spesifikk bruker, bare legg den inn i rankColor for den brukeren.

    Alle skins for originale spillere genereres automatisk. Hvis du vil legge til skins for warez-spillere, må du legge til url for skin i skinUrlOrPathToFile
        {
            inGameName: "malvineikemo",  <--- In-Game navn
            rank: "Utvikler",  <-- rang
            skinUrlOrPathToFile: "",  <-- url eller filsti for skin-bilde for warez-spillere (hvis du har original minecraft, la det være tomt)
            rankColor: "rgba(255, 3, 3, 1)"  <-- spesialrangfarge
        },

    Hvis du vil endre skintype, bytt userSKinTypeInAdminTeam med noe du vil ha fra arrayet i kommentarene
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        administratorer: "rgba(255, 124, 124, 0.5)",
        utviklere: "rgba(230, 83, 0, 0.5)",
        moderatorer: "rgba(11, 175, 255, 0.5)",
        byggere: "rgba(247, 2, 176, 0.5)",
    },
    stabSide: {
        administratorer: [
            {
                inGameName: "cyn",
                rank: "Eier",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
            {
                inGameName: "",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: "rgba()"
            },
            {
                inGameName: "Steve",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Steve",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ],
        utviklere: [
            {
                inGameName: "malvineikemo",
                rank: "Utvikler",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
        ],
        moderatorer: [
            {
                inGameName: "Steve",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Steve",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Steve",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ],
        byggere: [
            {
                inGameName: "Steve",
                rank: "Byggleder",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Steve",
                rank: "Bygger",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Steve",
                rank: "Bygger",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ]
    },

    /*
    Kontaktskjema
    ------------
    For å aktivere, må du sende den første e-posten via kontaktskjemaet og bekrefte den i e-posten.
    E-poster sendes via https://formsubmit.co/
    */
    contactPage: {
        email: "cyn@eventyrskogen.net"
    }
}

/*Hvis du vil endre fargen på nettsiden, gå til /css/global.css og i :root {} er en fargepalett (ikke endre navn på variabler, endre bare verdiene)*/

/*Hvis du vil at alt skal fungere som det skal og du ikke forstår hva som står her, ikke rør det :D*/

/*Mobil navigasjonsmeny (åpne, lukk)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*Vanlige spørsmål*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Konfigurer navigasjonsmeny*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Konfigurer header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Konfigurer kontakt*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "Ingen";
        else return (await data.presence_count);
    } catch (e) {
        return "Ingen";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "Ingen";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "Ingen";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "Ingen";
    }
}

/*IP-kopiering fungerer bare hvis du har HTTPS på nettstedet ditt*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "En feil har oppstått!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Sett konfigurasjonsdata til navigasjonsmenyen*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Sett konfigurasjonsdata til header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Sett konfigurasjonsdata til header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();