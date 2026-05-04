// seph's bedroom

let avatarTex      = null
let songArtTex     = null
let youvsBenTex    = null
let devtoolsTex    = null
let bgTex    = null

let selectedProject = 0

const trackTextures = []
const projects = [
    {
        name:     "DevTools",
        desc:     "just a small hub project with kewl functions like desync,backdoor scanner,httpspy,etc. im working to rework it now,so this image may not be accurate lol.",
        link:     "",
        imageTex: () => null        
    },
    {
        name:     "you vs benicio",
        desc:     "this was a YouVs style game i worked on,i did mainly the coding and bug fixing,now it is deprecated and abandoned by the owner ig.",
        link:     "",
        imageTex: () => null        
    },
    {
        name:     "Brickz Wrath",
        desc:     "this was a PVE boss fight style game,it was pretty cool and all but it ended not being posted because of the roblox publishing req updates.",
        link:     "",
        imageTex: () => null        
    }
]

const audio = new Audio()
let playing  = false
let trackIdx = 0

const tracks = [
    {
        title:  "Aria Math",
        artist: "C418",
        file:   "./musics/sounds/Aria.mp3",
        art:    "./musics/Logos/AriaMath.png",
    },
    {
        title:  "STOP",
        artist: "Labirhin",
        file:   "./musics/sounds/STOP.mp3",
        art:    "./musics/Logos/moron_art.png",
    },
    {
        title:  "Going Back To Where I Begin",
        artist: "Labirhin",
        file:   "./musics/sounds/GBTWIB.mp3",
        art:    "./musics/Logos/GBTWIB.png",
    },
        {
        title:  "Wrong",
        artist: "Kaitai the Maid",
        file:   "./musics/sounds/Wrong.mp3",
        art:    "./musics/Logos/Wrong.png",
    }
    
]

function loadTrack(i) {
    audio.src = tracks[i].file
}
loadTrack(0)

audio.addEventListener("ended", () => { skip(1) })

function togglePlay() {
    if (playing) {
        audio.pause()
        playing = false
    } else {
        audio.play().catch(() => {})
        playing = true
    }
}

function skip(dir) {
    trackIdx = (trackIdx + dir + tracks.length) % tracks.length
    loadTrack(trackIdx)
    if (playing) audio.play().catch(() => {})
}

function fmtTime(secs) {
    if (!secs || isNaN(secs)) return "00:00"
    const m = String(Math.floor(secs / 60)).padStart(2, "0")
    const s = String(Math.floor(secs % 60)).padStart(2, "0")
    return `${m}:${s}`
}

let weatherText = "..."
;(async () => {
    try {
        const r = await fetch("https://wttr.in/São Paulo?format=j1")
        const d = await r.json()
        const cc = d.current_condition[0]
        weatherText = `${cc.temp_C}°C, ${cc.weatherDesc[0].value.toLowerCase()}`
    } catch (_) {
        weatherText = "couldn't load :("
    }
})()

function mkTex(gl, url) {
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)
    }
    img.src = url
    return tex
}

async function start() {
    await ImGui.default()
    ImGui.CreateContext()

    const canvas = document.getElementById("output-canvas")
    ImGui_Impl.Init(canvas)
    ImGui.StyleColorsDark()

    const gl = ImGui_Impl.gl  
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clear(gl.COLOR_BUFFER_BIT);

    avatarTex   = mkTex(gl, "./Images/Avatar.jpeg")
    songArtTex  = mkTex(gl, "./Images/moron_art.jpg")
    youvsBenTex = mkTex(gl, "./Images/YouvsBenicio.png")
    devtoolsTex = mkTex(gl, "./Images/DevTools.png")
    bgTex       = mkTex(gl, "./Images/bg.jpg")

    tracks.forEach((t, i) => {
        trackTextures[i] = mkTex(gl, t.art)
    })

    const style = ImGui.GetStyle()
    const c     = style.Colors

    style.WindowRounding    = 0
    style.ChildRounding     = 0
    style.FrameRounding     = 0
    style.GrabRounding      = 0
    style.TabRounding       = 0
    style.ScrollbarRounding = 0
    style.ItemSpacing       = new ImGui.ImVec2(6, 3)
    style.WindowPadding     = new ImGui.ImVec2(6, 6)
    style.FramePadding      = new ImGui.ImVec2(4, 2)
    style.IndentSpacing     = 14

    c[ImGui.ImGuiCol.WindowBg] = new ImGui.ImVec4(0, 0, 0.0, 0.40)
    c[ImGui.ImGuiCol.ChildBg]          = new ImGui.ImVec4(0.04, 0.04, 0.06, 0.30)
    c[ImGui.ImGuiCol.Text]             = new ImGui.ImVec4(0.88, 0.88, 0.88, 1.00)
    c[ImGui.ImGuiCol.TextDisabled]     = new ImGui.ImVec4(0.45, 0.45, 0.50, 1.00)
    c[ImGui.ImGuiCol.Header]           = new ImGui.ImVec4(0.07, 0.11, 0.28, 1.00)
    c[ImGui.ImGuiCol.HeaderHovered]    = new ImGui.ImVec4(0.11, 0.17, 0.38, 1.00)
    c[ImGui.ImGuiCol.HeaderActive]     = new ImGui.ImVec4(0.15, 0.22, 0.48, 1.00)
    c[ImGui.ImGuiCol.Button]           = new ImGui.ImVec4(0.07, 0.11, 0.26, 1.00)
    c[ImGui.ImGuiCol.ButtonHovered]    = new ImGui.ImVec4(0.13, 0.19, 0.40, 1.00)
    c[ImGui.ImGuiCol.ButtonActive]     = new ImGui.ImVec4(0.18, 0.27, 0.52, 1.00)
    c[ImGui.ImGuiCol.FrameBg]          = new ImGui.ImVec4(0.06, 0.06, 0.09, 1.00)
    c[ImGui.ImGuiCol.FrameBgHovered]   = new ImGui.ImVec4(0.09, 0.09, 0.14, 1.00)
    c[ImGui.ImGuiCol.SliderGrab]       = new ImGui.ImVec4(0.28, 0.40, 0.72, 1.00)
    c[ImGui.ImGuiCol.SliderGrabActive] = new ImGui.ImVec4(0.38, 0.54, 0.90, 1.00)
    c[ImGui.ImGuiCol.Separator]        = new ImGui.ImVec4(0.14, 0.14, 0.20, 1.00)
    c[ImGui.ImGuiCol.ScrollbarBg]      = new ImGui.ImVec4(0.02, 0.02, 0.03, 1.00)
    c[ImGui.ImGuiCol.ScrollbarGrab]    = new ImGui.ImVec4(0.20, 0.25, 0.45, 1.00)

    const WFLAGS = (1<<0)|(1<<1)|(1<<2)|(1<<3)|(1<<6)

    function frame(time) {
        ImGui_Impl.NewFrame(time)
        ImGui.NewFrame()
        const drawList = ImGui.GetBackgroundDrawList();
        const displaySize = ImGui.GetIO().DisplaySize;
        drawList.AddImage(bgTex, new ImGui.ImVec2(0, 0), displaySize);

        const now   = new Date()
        const clock = [now.getHours(), now.getMinutes(), now.getSeconds()]
            .map(n => String(n).padStart(2, "0"))
            .join(":")

        ImGui.SetNextWindowPos(new ImGui.ImVec2(10, 10), 1)
        ImGui.Begin("##room", null, WFLAGS)
        ImGui.Dummy(new ImGui.ImVec2(283, 0))

        if (ImGui.TreeNode("about")) {
            if (avatarTex) {
                ImGui.Image(avatarTex, new ImGui.ImVec2(65, 65))
                ImGui.SameLine()
            }
            ImGui.BeginGroup()
                ImGui.Text("hi, i'm seph.")
                ImGui.Text("i drink mercury (sarcasm)")
                ImGui.Text("i like cats and coffee")
                ImGui.Text("i do exploiting on roblox")
                ImGui.Text("brazilian guy")
                ImGui.Text("besto friendo: fuqz.arpo")
                ImGui.Text("")
                ImGui.Text(`my time: ${clock}`)
                ImGui.Text(`my lovely weather: ${weatherText}`)
            ImGui.EndGroup()
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("projects")) {
            ImGui.BeginChild("##proj_sidebar", new ImGui.ImVec2(110, 80), true)
                projects.forEach((p, i) => {
                    if (ImGui.Selectable(p.name, selectedProject === i)) {
                        selectedProject = i
                    }
                })
            ImGui.EndChild()
            ImGui.SameLine()
            ImGui.BeginChild("##proj_content", new ImGui.ImVec2(0, 80), true)
                const proj = projects[selectedProject]
                ImGui.TextWrapped(proj.desc)

                // FIX: imageTex is now a function that returns the right texture,
                // instead of comparing a boolean to a string (which never matched)
                const tex = proj.imageTex()
                if (tex) {
                    ImGui.Image(tex, new ImGui.ImVec2(100, 70))
                }

                if (proj.link) {
                    if (ImGui.SmallButton("open")) window.open(proj.link, "_blank")
                }
            ImGui.EndChild()
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("links")) {
            if (ImGui.SmallButton("discord")) window.open("https://discord.gg/MvVBbftUYm", "_blank")
            
            if (ImGui.SmallButton("roblox"))  window.open("https://www.roblox.com/users/7606961053/profile",  "_blank")
        
            if (ImGui.SmallButton("tiktok")) window.open("https://www.tiktok.com/@spawnielthespawn", "_blank")
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("contact")) {
            ImGui.Text("discord: seph_.exploiter")
            ImGui.Text("email: seph@is.notaskid.ong")
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("Subdomains")) {
            ImGui.Text("kewl stuff from the website")
            if (ImGui.SmallButton("SeraphEngine (Unblocked games)")) window.open("./api/v3/SeraphEngine.html")
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("extras")) {
            ImGui.Text("stuff n things:")
            ImGui.TextColored(new ImGui.ImVec4(0.58, 1, 1, 0.47), ">can I steal this?");
            ImGui.SameLine()
            ImGui.TextColored(new ImGui.ImVec4(1, 1, 1, 0.25), "nuh uh");

            ImGui.TextColored(new ImGui.ImVec4(0.58, 1, 1, 0.47), ">are you a female?");
            ImGui.SameLine()
            ImGui.TextColored(new ImGui.ImVec4(1, 1, 1, 0.25), "maybe");

            ImGui.TextColored(new ImGui.ImVec4(0.58, 1, 1, 0.47), ">ur music sucks i could submit soem?");
            ImGui.SameLine()
            ImGui.TextColored(new ImGui.ImVec4(1, 1, 1, 0.25), "no my music doesnt suck grr but if you wanna submit some just contact me on discord lol");
            ImGui.TreePop()
        }

        if (ImGui.TreeNode("music player")) {
            const track = tracks[trackIdx]
            const tex = trackTextures[trackIdx]

            if (songArtTex) {
                ImGui.Image(tex, new ImGui.ImVec2(65, 65))
                ImGui.SameLine()
            }
            ImGui.BeginGroup()
                ImGui.Text("now playing:")
                ImGui.Text(track.title)
                ImGui.Text(`by ${track.artist}`)
            ImGui.EndGroup()

            if (ImGui.SmallButton("<<"))                    skip(-1)
            ImGui.SameLine()
            if (ImGui.SmallButton(playing ? "||" : " > ")) togglePlay()
            ImGui.SameLine()
            if (ImGui.SmallButton(">>"))                    skip(1)
            ImGui.SameLine()
            ImGui.Text(`  ${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`)

            if (ImGui.TreeNode("playlist")) {
                tracks.forEach((t, i) => {
                    if (ImGui.Selectable(`${t.title} - ${t.artist}`, i === trackIdx)) {
                        trackIdx = i
                        loadTrack(i)
                        if (playing) audio.play().catch(() => {})
                    }
                })
                ImGui.TreePop()
            }

            ImGui.TreePop()
        }

        ImGui.End()

        ImGui.EndFrame()
        ImGui.Render()
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData())

        window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
}

start()