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

            {/* <div className="font-svg2">
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
            </div> */}
        </>
    )
}