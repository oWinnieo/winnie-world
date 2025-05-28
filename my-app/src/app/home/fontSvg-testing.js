import './font.scss'
export const FontSvg = () => {
    // wtest demo:
    // https://www.reddit.com/r/Frontend/comments/1eq2flg/having_fun_with_svg_text_filters/?rdt=39219
    // https://codepen.io/avidrucker/pen/QWXqxMX
    return (
        <>
            {/* <!-- MB Filters --> */}
            <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="svg-style"
            >
                <defs>
                    <filter id="text-stroke-black">
                    {/* <!-- Expand the original text to create an outline --> */}
                    <feMorphology
                        operator="dilate"
                        radius="2.5"
                        in="SourceGraphic"
                        result="expanded"
                    />
                    {/* <!-- Color the outline --> */}
                    <feFlood floodColor="black" result="color" />
                    <feComposite in="color" in2="expanded" operator="in" result="outline" />
                    {/* <!-- Place the original text on top of the outline --> */}
                    <feComposite
                        in="SourceGraphic"
                        in2="outline"
                        operator="over"
                        result="withOutline"
                    />
                    </filter>
                </defs>
            </svg>

            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                <defs>
                <filter id="text-shadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="2" result="offsetblur" />
                    <feFlood floodColor="rgba(0,0,0,1)" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                </defs>
            </svg> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="svg-style"
                >
                <defs>
                    <filter id="text-shadow">
                    {/* <!-- This is necessary to contain the shadow within the filter area --> */}
                    <feOffset in="SourceAlpha" dx="0" dy="5" result="offset" />
                    {/* <!-- Color the offset --> */}
                    <feFlood floodColor="black" result="flood" />
                    {/* <!-- Clip the color to the offset --> */}
                    <feComposite in="flood" in2="offset" operator="in" result="shadow" />
                    {/* <!-- Place the original text over the shadow --> */}
                    <feComposite in="SourceGraphic" in2="shadow" operator="over" />
                    </filter>
                </defs>
                </svg>




                <div className="h0 w0 relative">
  {/* <!-- SSB Filters --> */}
  <svg xmlns="http://www.w3.org/2000/svg" className="h0 w0">
    <defs>
      <filter id="fire" x="-20%" y="-20%" width="140%" height="140%">
        {/* <!-- Expand the source alpha to create the first white outline --> */}
        <feMorphology
          operator="dilate"
          radius="1.5"
          in="SourceAlpha"
          result="expandedOutline"
        />
        <feFlood flood-color="white" result="whiteColor" />
        <feComposite
          in="whiteColor"
          in2="expandedOutline"
          operator="in"
          result="whiteOutline"
        />

        {/* <!-- Expand more for the second black outline --> */}
        <feMorphology
          operator="dilate"
          radius="4.5"
          in="SourceAlpha"
          result="expandedBlackOutline"
        />
        <feFlood flood-color="black" result="blackColor" />
        <feComposite
          in="blackColor"
          in2="expandedBlackOutline"
          operator="in"
          result="blackOutline"
        />

        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05"
          numOctaves="10"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 1 0"
          result="alphaNoise"
        />
        <feComposite
          in="SourceGraphic"
          in2="alphaNoise"
          operator="atop"
          result="roughFire"
        />

        <feComposite
          in="roughFire"
          in2="SourceAlpha"
          operator="atop"
          result="finalFire"
        />

        {/* <!-- Adjust alpha and move the shadow --> */}
        <feColorMatrix
          in="expandedBlackOutline"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
          result="semiTransparentBlack"
        />
        <feOffset
          in="semiTransparentBlack"
          dx="5"
          dy="5"
          result="movedShadow"
        />

        <feMerge result="outlinedText">
          <feMergeNode in="movedShadow" />
          <feMergeNode in="blackOutline" />
          <feMergeNode in="whiteOutline" />
          <feMergeNode in="finalFire" />
        </feMerge>
      </filter>
    </defs>
  </svg>
  
  {/* <!-- MB Filters --> */}
  <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  style="height:0; width: 0;"
>
  <defs>
    <filter id="text-stroke-black">
      {/* <!-- Expand the original text to create an outline --> */}
      <feMorphology
        operator="dilate"
        radius="2.5"
        in="SourceGraphic"
        result="expanded"
      />
      {/* <!-- Color the outline --> */}
      <feFlood flood-color="black" result="color" />
      <feComposite in="color" in2="expanded" operator="in" result="outline" />
      {/* <!-- Place the original text on top of the outline --> */}
      <feComposite
        in="SourceGraphic"
        in2="outline"
        operator="over"
        result="withOutline"
      />
    </filter>
  </defs>
</svg>

<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  style="height:0; width: 0;"
>
  <defs>
    <filter id="text-shadow">
      {/* <!-- This is necessary to contain the shadow within the filter area --> */}
      <feOffset in="SourceAlpha" dx="0" dy="5" result="offset" />
      {/* <!-- Color the offset --> */}
      <feFlood flood-color="black" result="flood" />
      {/* <!-- Clip the color to the offset --> */}
      <feComposite in="flood" in2="offset" operator="in" result="shadow" />
      {/* <!-- Place the original text over the shadow --> */}
      <feComposite in="SourceGraphic" in2="shadow" operator="over" />
    </filter>
  </defs>
</svg>
  
  {/* <!-- PM Filters --> */}
  <svg
       className="w0 h0"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    {/* <!-- First Filter: Yellow Text, Blue Outline, Darkgoldenrod Inset Shadow --> */}
    <filter id="textOutlineShadow">
      {/* <!-- Colors --> */}
      <feFlood flood-color="yellow" result="COLOR-red" />
      <feFlood flood-color="blue" result="COLOR-purple" />
      <feFlood flood-color="darkgoldenrod" result="COLOR-cyan" />

      {/* <!-- Fat Outline (Blue) --> */}
      <feMorphology
        operator="dilate"
        radius="2.5"
        in="SourceAlpha"
        result="OUTLINE_10"
      />
      <feComposite
        operator="in"
        in="COLOR-purple"
        in2="OUTLINE_10"
        result="OUTLINE_20"
      />

      {/* <!-- Main Text Fill (Yellow) --> */}
      <feComposite
        operator="in"
        in="COLOR-red"
        in2="SourceAlpha"
        result="MAIN_TEXT"
      />

      {/* <!-- Inset Shadow (Darkgoldenrod) --> */}
      <feOffset in="SourceAlpha" dx="-2" dy="2" result="INSET_SHADOW_10" />
      <feComposite
        operator="out"
        in="SourceAlpha"
        in2="INSET_SHADOW_10"
        result="INSET_SHADOW_20"
      />
      <feComposite
        operator="in"
        in="COLOR-cyan"
        in2="INSET_SHADOW_20"
        result="INSET_SHADOW_30"
      />

      {/* <!-- Combine layers --> */}
      <feMerge>
        <feMergeNode in="OUTLINE_20" />
        <feMergeNode in="MAIN_TEXT" />
        <feMergeNode in="INSET_SHADOW_30" />
      </feMerge>
    </filter>
  </defs>
</svg>

<svg className="w0 h0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    {/* <!-- Filter for Dark Blue Extrude --> */}
    <filter id="extrudeEffect">
      {/* <!-- Color for Extrude --> */}
      <feFlood flood-color="darkblue" result="COLOR-green" />

      {/* <!-- 3D Extrude (Dark Blue) --> */}
      <feConvolveMatrix
        order="8,8"
        divisor="1"
        kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
        in="SourceAlpha"
        result="EXTRUDE_10"
      />
      <feOffset dx="-2" dy="2" in="EXTRUDE_10" result="EXTRUDE_20" />
      <feComposite
        operator="in"
        in="COLOR-green"
        in2="EXTRUDE_20"
        result="EXTRUDE_30"
      />

      {/* <!-- Output the extrude --> */}
      <feMerge>
        <feMergeNode in="EXTRUDE_30" />
        <feMergeNode in="SourceGraphic" />
        {/* <!-- Keeps the original text on top --> */}
      </feMerge>
    </filter>
  </defs>
</svg>
  
  {/* <!-- NT Filters --> */}
  <svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  className="w0 h0"
>
  <defs>
    {/* <!-- Text Warping Filter --> */}
    <filter id="textOutlineShadow2" x="-10%" y="-10%" width="120%" height="120%">
      {/* <!-- Generate turbulence --> */}
      <feTurbulence result="" seed="0" />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.04"
        numOctaves="2"
        result="turbulence"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        scale="10"
        xChannelSelector="R"
        yChannelSelector="B"
        result="displacedText"
      />

      {/* <!-- Fat Outline (White) --> */}
      <feMorphology
        operator="dilate"
        radius="2.5"
        in="displacedText"
        result="OUTLINE_10"
      />
      <feFlood flood-color="white" result="COLOR-white" />
      <feComposite
        operator="in"
        in="COLOR-white"
        in2="OUTLINE_10"
        result="OUTLINE_20"
      />

      {/* <!-- Combine layers --> */}
      <feMerge>
        <feMergeNode in="OUTLINE_20" />
        <feMergeNode in="displacedText" />
      </feMerge>
    </filter>
  </defs>
</svg>

<svg className="w0 h0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    {/* <!-- Filter for Dark Blue Extrude --> */}
    <filter id="extrudeEffect2">
      {/* <!-- Color for Extrude --> */}
      <feFlood flood-color="darkblue" result="COLOR-green" />

      {/* <!-- 3D Extrude (Dark Blue) --> */}
      <feConvolveMatrix
        order="8,8"
        divisor="1"
        kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
        in="SourceAlpha"
        result="EXTRUDE_10"
      />
      <feOffset dx="4" dy="4" in="EXTRUDE_10" result="EXTRUDE_20" />
      <feComposite
        operator="in"
        in="COLOR-green"
        in2="EXTRUDE_20"
        result="EXTRUDE_30"
      />

      {/* <!-- Fat Outline (Black) --> */}
      <feMorphology
        operator="dilate"
        radius="2.5"
        in="SourceAlpha"
        result="OUTLINE_40"
      />
      <feComposite
        operator="in"
        in="COLOR-black"
        in2="OUTLINE_40"
        result="OUTLINE_50"
      />

      {/* <!-- Output the extrude --> */}
      <feMerge>
        <feMergeNode in="EXTRUDE_30" />
        <feMergeNode in="OUTLINE_50" />
        <feMergeNode in="SourceGraphic" />
        {/* <!-- Keeps the original text on top --> */}
      </feMerge>
    </filter>
  </defs>
</svg>
  
  {/* <!--HS filters--> */}
  
<svg className="h0 w0" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- Define the combined filter using both rough edges and colored noise --> */}
  <defs>
    <filter id="combinedFilter" x="0" y="0" width="100%" height="100%">
      {/* <!-- Generate turbulence for rough edges --> */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.5"
        numOctaves="1"
        result="roughTurbulence"
      />
      {/* <!-- Displacement to roughen the edges subtly using the above turbulence --> */}
      <feDisplacementMap
        in="SourceGraphic"
        in2="roughTurbulence"
        scale="2"
        xChannelSelector="R"
        yChannelSelector="G"
        result="roughenedEdges"
      />
      {/* <!-- Generate turbulence for colored noise --> */}
      <feTurbulence
        type="turbulence"
        baseFrequency="0.1"
        numOctaves="3"
        seed="5"
        result="colorTurbulence"
      />
      {/* <!-- Colorize the turbulence to range from yellow to orange --> */}
      <feColorMatrix
        in="colorTurbulence"
        type="matrix"
        values="0 0 0 0 1   0 1 0 0 0.1   0 0 0 0 0   5 5 5 5 1"
        result="coloredNoise"
      />
      {/* <!-- Use the roughened edges as a clipping mask for the colored noise --> */}
      <feComposite
        in="coloredNoise"
        in2="roughenedEdges"
        operator="in"
        result="coloredText"
      />

      {/* <!-- Dilate the roughened edges to expand the text edges --> */}
      <feMorphology
        operator="dilate"
        in="roughenedEdges"
        radius="3"
        result="dilatedEdges"
      />

      {/* <!-- Make the stone bg base by dilating again --> */}
      <feMorphology
        operator="dilate"
        in="dilatedEdges"
        radius="6"
        result="dilatedEdges2"
      />

      {/* <!-- Apply Gaussian blur to the dilated text for softening --> */}
      <feGaussianBlur
        in="dilatedEdges"
        stdDeviation="2"
        result="blurredEdges"
      />

      {/* <!-- top base light --> */}
      <feSpecularLighting
        in="blurredEdges"
        surfaceScale="3"
        specularConstant="1.25"
        specularExponent="30"
        lighting-color="orange"
        result="beveledEffect"
      >
        <feDistantLight azimuth="270" elevation="35" />
      </feSpecularLighting>

      <feSpecularLighting
        result="cyanLight"
        specularConstant="1"
        specularExponent="10"
        lighting-color="cyan"
      >
        <fePointLight x="380" y="50" z="35" />
      </feSpecularLighting>

      <feSpecularLighting
        result="rightLight"
        specularConstant="0.8"
        specularExponent="40"
        lighting-color="black"
      >
        <fePointLight x="1500" y="50" z="2000" />
      </feSpecularLighting>

      <feSpecularLighting
        result="leftLight"
        specularConstant="0.5"
        specularExponent="10"
        lighting-color="black"
      >
        <fePointLight x="-100" y="40" z="500" />
      </feSpecularLighting>

      <feComposite
        in="beveledEffect"
        in2="dilatedEdges"
        operator="in"
        result="beveledText"
      />

      <feComposite
        in="beveledText"
        in2="cyanLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="comboLight1"
      />

      <feComposite
        in="comboLight1"
        in2="rightLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="comboLight2"
      />

      <feComposite
        in="comboLight2"
        in2="leftLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="comboLight3"
      />

      <feComposite
        in="comboLight3"
        in2="dilatedEdges"
        operator="in"
        result="finalText"
      />

      {/* <!-- Dilated Text BG fill --> */}
      {/* <!-- Flood fill the dilated edges with a solid color --> */}
      {/* <!-- TODO: change black to a dark brown --> */}
      <feFlood flood-color="#4a2313" result="blackFill" />
      <feComposite
        in="blackFill"
        in2="dilatedEdges"
        operator="in"
        result="coloredDilatedEdges"
      />

      <feFlood flood-color="gray" result="grayFill" />
      <feComposite
        in="grayFill"
        in2="dilatedEdges2"
        operator="in"
        result="coloredDilatedEdges2"
      />

      {/* <!-- noisy stone --> */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.1"
        numOctaves="5"
        result="noise"
      />

      {/* <!-- Displacement to roughen the edges subtly using the above turbulence --> */}
      <feDisplacementMap
        in="dilatedEdges2"
        in2="roughTurbulence"
        scale="2"
        xChannelSelector="R"
        yChannelSelector="G"
        result="roughenedEdges2"
      />

      <feComposite
        operator="in"
        in="roughenedEdges2"
        in2="noise"
        result="noisy_stone"
      />

      <feFlood flood-color="#00000050" result="darkColor" />

      <feComposite
        operator="in"
        in="darkColor"
        in2="roughenedEdges2"
        result="darkTint"
      />

      {/* <!-- cracked stone --> */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.044"
        seed="28"
        numOctaves="2"
        result="noise"
      />
      <feComponentTransfer>
        <feFuncA
          type="discrete"
          tableValues="0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
        />
      </feComponentTransfer>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
                                             0 0 0 0 0
                                             0 0 0 0 0
                                             0 0 0 1 0"
        result="alpha"
      />
      <feColorMatrix
        type="matrix"
        values="0.5 0 0 0 0
                                             0 0.5 0 0 0
                                             0 0 0.5 0 0
                                             0 0 0 0.5 0"
        result="black_cracks"
      />
      <feComposite
        operator="in"
        in="black_cracks"
        in2="roughenedEdges2"
        result="cracked_text"
      />

      {/* <!-- pitted stone --> */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.15"
        numOctaves="3"
        result="noise2"
      />
      <feComponentTransfer>
        <feFuncA
          type="discrete"
          tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0"
        />
      </feComponentTransfer>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
                                             0 0 0 0 0
                                             0 0 0 0 0
                                             0 0 0 1 0"
        result="alpha2"
      />
      <feColorMatrix
        type="matrix"
        values="0.5 0 0 0 0
                                             0 0.5 0 0 0
                                             0 0 0.5 0 0
                                             0 0 0 0.75 0"
        result="black_pits"
      />

      <feGaussianBlur in="black_pits" stdDeviation="1" result="blurred_pits" />

      <feComposite
        operator="in"
        in="black_pits"
        in2="roughenedEdges2"
        result="pitted_text"
      />

      <feComposite
        operator="in"
        in="blurred_pits"
        in2="roughenedEdges2"
        result="blurred_pitted_text"
      />

      {/* <!----> */}

      <feGaussianBlur
        in="black_cracks"
        stdDeviation="1"
        result="blurred_cracks"
      />

      <feComposite
        operator="in"
        in="blurred_cracks"
        in2="roughenedEdges2"
        result="cracked_blurred_text"
      />

      {/* <!-- black outline --> */}
      <feMorphology
        operator="dilate"
        radius="3"
        in="coloredDilatedEdges2"
        result="dilated"
      />

      <feComposite
        operator="out"
        in="dilated"
        in2="roughenedEdges2"
        result="outline"
      />

      <feGaussianBlur in="outline" stdDeviation="3" result="blurredOutline" />

      {/* <!-- <feFlood flood-color="black" result="color"/>--> */}
      <feComposite
        in="blurredOutline"
        in2="roughenedEdges2"
        operator="in"
        result="innerBlur"
      />

      {/* <!-- overlay of noisy_stone to make inner text less cracked w/ dilate --> */}

      <feMorphology
        operator="erode"
        radius="3"
        in="roughenedEdges2"
        result="eroded"
      />

      <feGaussianBlur in="eroded" stdDeviation="1" result="blurredBlack" />

      {/* <!-- text shadow behind 3D orange text on top of stone bg --> */}
      <feGaussianBlur in="dilatedEdges" stdDeviation="4" result="shadow1" />
      <feOffset dx="3" dy="3" in="shadow1" result="offsetShadow1" />
      <feFlood flood-color="black" result="blackFill" />
      <feComposite
        in="blackFill"
        in2="offsetShadow1"
        operator="in"
        result="darkShadow1"
      />

      <feComposite
        in="blurredBlack"
        in2="roughenedEdges2"
        operator="in"
        result="constrainedAlpha"
      />

      <feComposite
        in="noisy_stone"
        in2="constrainedAlpha"
        operator="in"
        result="blurredStone"
      />

      <feOffset dx="0" dy="2" in="roughenedEdges2" result="offsetLayer1" />
      <feFlood flood-color="#353535" result="grayColor" />
      <feComposite
        in="grayColor"
        in2="offsetLayer1"
        operator="in"
        result="grayOffset1"
      />

      <feOffset dx="0" dy="4" in="roughenedEdges2" result="offsetLayer2" />
      <feComposite
        in="grayColor"
        in2="offsetLayer2"
        operator="in"
        result="grayOffset2"
      />

      <feOffset dx="0" dy="6" in="roughenedEdges2" result="offsetLayer3" />
      <feComposite
        in="grayColor"
        in2="offsetLayer3"
        operator="in"
        result="grayOffset3"
      />

      {/* <!-- Merge the original graphic to maintain the text's alpha shape --> */}
      <feMerge>
        <feMergeNode in="grayOffset1" />
        <feMergeNode in="grayOffset2" />
        <feMergeNode in="grayOffset3" />
        <feMergeNode in="noisy_stone" />

        <feMergeNode in="cracked_text" />
        {/* <!-- inner noisy stone that is alpha restrained to a blurred inner shaddow alpha to make the stone appear less cracked in the center of the text --> */}
        <feMergeNode in="cracked_blurred_text" />

        <feMergeNode in="blurred_pitted_text" />
        <feMergeNode in="blurred_pitted_text" />
        <feMergeNode in="pitted_text" />

        <feMergeNode in="blurredStone" />
        <feMergeNode in="darkTint" />
        <feMergeNode in="darkTint" />

        <feMergeNode in="cracked_blurred_text" />
        <feMergeNode in="cracked_blurred_text" />
        <feMergeNode in="cracked_blurred_text" />
        <feMergeNode in="blurred_pitted_text" />

        <feMergeNode in="innerBlur" />
        <feMergeNode in="innerBlur" />
        <feMergeNode in="innerBlur" />

        <feMergeNode in="coloredDilatedEdges2" />
        <feMergeNode in="darkShadow1" />
        <feMergeNode in="darkShadow1" />
        <feMergeNode in="coloredDilatedEdges" />
        <feMergeNode in="finalText" />
        <feMergeNode in="coloredText" />
      </feMerge>
    </filter>
  </defs>
</svg>
</div>


            <div className="font-svg1">
                <div
                className="f0 fw9 word1 noto-sans-jp text-stroke-black cascading-letters kern text-shadow pl3 dib"
                >
                    <span className="f-subheadline">W</span>
                    <span className="f-subheadline">I</span>
                    <span className="f-subheadline">N</span>
                    <span className="f-subheadline">N</span>
                    <span className="f-subheadline">I</span>
                    <span className="f-subheadline">E</span>
                    <span className="f-subheadline">'</span>
                    <span className="f-subheadline">S</span>
                </div>

                <div
                className="f0 fw9 word2 noto-sans-jp text-stroke-black cascading-letters kern text-shadow pl3 dib"
                >
                    <span className="f-subheadline">W</span>
                    <span className="f-subheadline">O</span>
                    <span className="f-subheadline">R</span>
                    <span className="f-subheadline">L</span>
                    <span className="f-subheadline">D</span>
                </div>
            </div>

            <div className="font-svg2">
                <div
                className="f0 fw9 dib noto-sans-jp cascading-letters2 kern2 textOutlineShadow extrudeEffect pl3"
                >
                <span className="f-subheadline">B</span>
                <span className="f-subheadline">o</span>
                <span className="f-subheadline">K</span>
                <span className="f-subheadline">é</span>
                <span className="f-subheadline">M</span>
                <span className="f-subheadline">a</span>
                <span className="f-subheadline">N</span>
                </div>
            </div>
        </>
    )
}