// seph's bedroom
let bgTex = null

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

    bgTex = mkTex(gl, "../../Images/bg.jpg")


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

        const drawList = ImGui.GetBackgroundDrawList()
        const displaySize = ImGui.GetIO().DisplaySize

        if (bgTex) {
            drawList.AddImage(bgTex, new ImGui.ImVec2(0, 0), displaySize)
        }

        ImGui.SetNextWindowPos(new ImGui.ImVec2(10, 10), 1)
        ImGui.Begin("##room", null, WFLAGS)

        ImGui.Text("SeraphEngine by SephXploiter")
        //Actually GOOD games btw
        if (ImGui.TreeNode("Gemmy Games")) {
            if (ImGui.SmallButton("Minecraft.pxi"))  window.open("./gems/Minecraft.html",  "_blank")
            if (ImGui.SmallButton("Geometry Dash.pxi"))  window.open("./gems/GemmyDash.html",  "_blank")
            if (ImGui.SmallButton("Baldi's Basic.pxi"))  window.open("./gems/Baldis.html",  "_blank")
            if (ImGui.SmallButton("Fnaf.pxi"))  window.open("./gems/FnaF1.html",  "_blank")
            if (ImGui.SmallButton("UCN.pxi"))  window.open("./gems/UCN.html",  "_blank")
            if (ImGui.SmallButton("Untitled Goose Game.pxi"))  window.open("./gems/UGG.html",  "_blank")
            if (ImGui.SmallButton("OneShot.pxi"))  window.open("./gems/OneShot.html",  "_blank")
            if (ImGui.SmallButton("Deltarune.pxi"))  window.open("./gems/Deltarune.html",  "_blank")
            if (ImGui.SmallButton("Undertale.pxi"))  window.open("./gems/Undertale.html",  "_blank")
            if (ImGui.SmallButton("Needy Streamer Overload.pxi"))  window.open("./gems/NSO.html",  "_blank")
            if (ImGui.SmallButton("Groomer Run Simulator.pxi"))  window.open("./gems/Epstein.html",  "_blank")
            if (ImGui.SmallButton("OSU.pxi"))  window.open("./gems/OSU.html",  "_blank")
            if (ImGui.SmallButton("Helltaker.pxi"))  window.open("./gems/HellTaker.html",  "_blank")
            if (ImGui.SmallButton("Hollow Knight.pxi"))  window.open("./gems/Hollow Knight.html",  "_blank")
            if (ImGui.SmallButton("Ultrakill.pxi"))  window.open("./gems/Ultrakill.html",  "_blank")
            if (ImGui.SmallButton("Celeste.pxi"))  window.open("./gems/Celeste.html",  "_blank")
            if (ImGui.SmallButton("Balatro.pxi"))  window.open("./gems/Balatro.html",  "_blank")
            if (ImGui.SmallButton("Thats Not My Neighbour.pxi"))  window.open("./gems/TNMN.html",  "_blank")
            if (ImGui.SmallButton("SlikSong.pxi"))  window.open("./gems/SilkSong.html",  "_blank")
            ImGui.TreePop()
        }

        //More website focused
        if (ImGui.TreeNode("Kewl Websites")) {
            if (ImGui.SmallButton("30 Dollars.gem"))  window.open("./KewlWeb/30Dollars.html",  "_blank")
            if (ImGui.SmallButton("AllAnime.gem"))  window.open("./KewlWeb/AllAnime.html",  "_blank")
            if (ImGui.SmallButton("Cineby.gem"))  window.open("./KewlWeb/Cineby.html",  "_blank")

            ImGui.Text("More Websites Coming!")
            
            ImGui.TreePop()
        }


        ImGui.End()

        ImGui.Render()
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData())

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

start()