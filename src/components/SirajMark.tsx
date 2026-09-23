import { useId } from 'react'
import './SirajMark.css'

/**
 * Le signe Siraj 360 — phare, lanterne, faisceaux, écharpe, vague et écho.
 *
 * Tracés et dégradés repris tels quels de la charte v6.2
 * (Context/Siraj360_design-tokens_v6.2_2026-09.json → logo.geometry),
 * relevés sur l'image validée Logo_SIRAJ.png. Repère d'origine 0 0 1254 1254,
 * signe de (196, 160) à (1140, 752).
 *
 * Interdits de la charte respectés ici : pas de recoloration, pas d'aplat des
 * dégradés, lanterne allumée, écharpe solidaire de la tour, aucune rotation.
 * Le mot-symbole « SIRAJ360 » n'est PAS redessiné : c'est un dessin, jamais
 * une police — déposer le SVG officiel dans public/ pour le lockup complet.
 *
 * En-tête et pied de page : rendu fixe, à 40–90 px.
 *
 * `alive` allume la version d'ouverture. Ce qui vit alors n'est QUE de la
 * lumière — opacité de la lampe et des faisceaux, balayage clair le long des
 * cônes, impulsions qui partent vers le large. La géométrie du signe n'est
 * ni tournée, ni mise à l'échelle, ni déformée : la charte l'interdit, et un
 * phare qui bouge n'est plus un phare.
 */
export function SirajMark({
  className,
  title,
  alive = false,
}: {
  className?: string
  title?: string
  alive?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const id = (name: string) => `${uid}-${name}`

  return (
    <svg
      className={[className, alive ? 'mk' : null].filter(Boolean).join(' ') || undefined}
      viewBox="190 150 960 620"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient
          id={id('beam')}
          gradientUnits="userSpaceOnUse"
          x1="600"
          y1="0"
          x2="1140"
          y2="0"
        >
          <stop offset="0" stopColor="#FCB30E" stopOpacity="1" />
          <stop offset="0.25" stopColor="#FECB4A" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FEE08A" stopOpacity="0.8" />
          <stop offset="0.75" stopColor="#FEEFBC" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FEF8E8" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id={id('beam2')}
          gradientUnits="userSpaceOnUse"
          x1="600"
          y1="0"
          x2="1140"
          y2="0"
        >
          <stop offset="0" stopColor="#FDB825" stopOpacity="1" />
          <stop offset="0.25" stopColor="#FED270" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FEE49A" stopOpacity="0.8" />
          <stop offset="0.75" stopColor="#FEF2CE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FEF8E8" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={id('glow')} gradientUnits="userSpaceOnUse" cx="526" cy="303" r="96">
          <stop offset="0" stopColor="#FFFBEA" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#FFF3C4" stopOpacity="0.6" />
          <stop offset="0.7" stopColor="#FFEA9A" stopOpacity="0.2" />
          <stop offset="1" stopColor="#FFE690" stopOpacity="0" />
        </radialGradient>

        <radialGradient
          id={id('hotspot')}
          gradientUnits="userSpaceOnUse"
          cx="498"
          cy="303"
          r="42"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Tour : face gauche jusqu'à x 534, face centrale blanche, face droite de 556 à 576. */}
        <linearGradient
          id={id('tower')}
          gradientUnits="userSpaceOnUse"
          x1="435"
          y1="0"
          x2="622"
          y2="0"
        >
          <stop offset="0" stopColor="#C3B7AF" />
          <stop offset="0.36" stopColor="#FFFFFF" />
          <stop offset="0.68" stopColor="#FFFFFF" />
          <stop offset="0.78" stopColor="#FDE7BB" />
          <stop offset="1" stopColor="#FEBA3C" />
        </linearGradient>

        {/* Écharpe : dégradé adouci en v6.2, de la pointe au pied. */}
        <linearGradient
          id={id('sash')}
          gradientUnits="userSpaceOnUse"
          x1="559"
          y1="444"
          x2="430"
          y2="584"
        >
          <stop offset="0" stopColor="#FEDA5C" />
          <stop offset="0.55" stopColor="#F6C243" />
          <stop offset="1" stopColor="#DCA02C" />
        </linearGradient>

        <linearGradient
          id={id('dome')}
          gradientUnits="userSpaceOnUse"
          x1="452"
          y1="0"
          x2="608"
          y2="0"
        >
          <stop offset="0" stopColor="#DC982C" />
          <stop offset="0.5" stopColor="#FDC835" />
          <stop offset="1" stopColor="#FEE9A0" />
        </linearGradient>

        <linearGradient
          id={id('domeBand')}
          gradientUnits="userSpaceOnUse"
          x1="446"
          y1="0"
          x2="614"
          y2="0"
        >
          <stop offset="0" stopColor="#FDF3E0" />
          <stop offset="1" stopColor="#F7D47A" />
        </linearGradient>

        <linearGradient
          id={id('finial')}
          gradientUnits="userSpaceOnUse"
          x1="524"
          y1="0"
          x2="536"
          y2="0"
        >
          <stop offset="0" stopColor="#D68C06" />
          <stop offset="1" stopColor="#FEC930" />
        </linearGradient>

        <linearGradient
          id={id('lantern')}
          gradientUnits="userSpaceOnUse"
          x1="463"
          y1="0"
          x2="588"
          y2="0"
        >
          <stop offset="0" stopColor="#E59710" />
          <stop offset="1" stopColor="#FED65E" />
        </linearGradient>

        <linearGradient
          id={id('mullion')}
          gradientUnits="userSpaceOnUse"
          x1="519"
          y1="0"
          x2="533"
          y2="0"
        >
          <stop offset="0" stopColor="#FED054" />
          <stop offset="0.5" stopColor="#FEE891" />
          <stop offset="1" stopColor="#FED559" />
        </linearGradient>

        <radialGradient
          id={id('pane')}
          gradientUnits="objectBoundingBox"
          cx="0.5"
          cy="0.42"
          r="0.72"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FEDD6C" />
        </radialGradient>

        <linearGradient
          id={id('galBand')}
          gradientUnits="userSpaceOnUse"
          x1="441"
          y1="0"
          x2="608"
          y2="0"
        >
          <stop offset="0" stopColor="#D99429" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FEE275" />
        </linearGradient>

        <linearGradient
          id={id('galFront')}
          gradientUnits="userSpaceOnUse"
          x1="441"
          y1="0"
          x2="608"
          y2="0"
        >
          <stop offset="0" stopColor="#B29D83" />
          <stop offset="1" stopColor="#F9EEE9" />
        </linearGradient>

        <linearGradient
          id={id('wave')}
          gradientUnits="userSpaceOnUse"
          x1="250"
          y1="600"
          x2="850"
          y2="740"
        >
          <stop offset="0" stopColor="#EB9B03" />
          <stop offset="0.5" stopColor="#F8AC06" />
          <stop offset="1" stopColor="#FEC72A" />
        </linearGradient>

        <linearGradient
          id={id('echo')}
          gradientUnits="userSpaceOnUse"
          x1="201"
          y1="0"
          x2="527"
          y2="0"
        >
          <stop offset="0" stopColor="#DCD9D9" />
          <stop offset="1" stopColor="#ECEAEA" />
        </linearGradient>

        <linearGradient
          id={id('arc')}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="453"
          x2="0"
          y2="631"
        >
          <stop offset="0" stopColor="#FED950" />
          <stop offset="0.35" stopColor="#FEBE0A" />
          <stop offset="0.72" stopColor="#F5A905" />
          <stop offset="1" stopColor="#EB9D08" />
        </linearGradient>

        {/* Découpe sur les cônes : le balayage et les impulsions restent
            dans la lumière, quoi qu'il arrive. */}
        <clipPath id={id('cone')}>
          <path d="M600 288 L1140 128 L1140 232 L600 299 Z" />
          <path d="M600 303 L1140 266 L1140 464 L600 319 Z" />
        </clipPath>

        {/* Volet d'ouverture : la lumière se déploie depuis la lanterne.
            C'est une révélation, pas un étirement du signe. */}
        <clipPath id={id('reveal')}>
          <rect className="mk__wipe" x="520" y="60" width="680" height="460" />
        </clipPath>

        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF8E4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF8E4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFF8E4" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={id('blip')}>
          <stop offset="0" stopColor="#FFFBEA" stopOpacity="1" />
          <stop offset="0.45" stopColor="#FFE9A8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFC933" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id={id('bar1')}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="591"
          x2="0"
          y2="701"
        >
          <stop offset="0" stopColor="#F5C540" />
          <stop offset="1" stopColor="#E99B04" />
        </linearGradient>
        <linearGradient
          id={id('bar2')}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="550"
          x2="0"
          y2="700"
        >
          <stop offset="0" stopColor="#FBC738" />
          <stop offset="1" stopColor="#D88B04" />
        </linearGradient>
        <linearGradient
          id={id('bar3')}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="509"
          x2="0"
          y2="699"
        >
          <stop offset="0" stopColor="#FEC726" />
          <stop offset="1" stopColor="#9A7636" />
        </linearGradient>
      </defs>

      {/* Faisceaux — la lanterne reste allumée (interdit de la charte). */}
      <g clipPath={alive ? `url(#${id('reveal')})` : undefined}>
        <g className="mk__beams">
          <path d="M600 288 L1140 128 L1140 232 L600 299 Z" fill={`url(#${id('beam')})`} />
          <path d="M600 303 L1140 266 L1140 464 L600 319 Z" fill={`url(#${id('beam2')})`} />
        </g>

        {alive && (
          <g clipPath={`url(#${id('cone')})`}>
            {/* Le balayage : la lumière file du cœur de la lanterne vers le large. */}
            <rect
              className="mk__sheen"
              x="600"
              y="90"
              width="230"
              height="420"
              fill={`url(#${id('sheen')})`}
            />

            {/* Impulsions : des signaux qui partent au large. Elles suivent
                l'axe de chaque cône, donc elles ne sortent jamais de la
                lumière. */}
            <circle
              className="mk__blip mk__blip--a"
              cx="626"
              cy="311"
              r="7"
              fill={`url(#${id('blip')})`}
            />
            <circle
              className="mk__blip mk__blip--b"
              cx="626"
              cy="318"
              r="5.5"
              fill={`url(#${id('blip')})`}
            />
            <circle
              className="mk__blip mk__blip--c"
              cx="626"
              cy="294"
              r="5"
              fill={`url(#${id('blip')})`}
            />
          </g>
        )}
      </g>

      {/* Arc « 360 » — la virgule qui referme le tour d'horizon.
          Révélé au chargement par le masque d'épine ci-dessus. */}
      <path
        d="M757.0 453.0 C752.2 453.2 754.5 452.0 756.0 455.0 C757.5 458.0 762.7 468.3 766.0 471.0 C769.3 473.7 771.2 470.2 776.0 471.0 C780.8 471.8 787.0 472.3 795.0 476.0 C803.0 479.7 816.5 487.3 824.0 493.0 C831.5 498.7 835.2 503.8 840.0 510.0 C844.8 516.2 849.3 522.7 853.0 530.0 C856.7 537.3 860.2 545.3 862.0 554.0 C863.8 562.7 864.7 573.3 864.0 582.0 C863.3 590.7 861.0 598.3 858.0 606.0 C855.0 613.7 847.7 624.0 846.0 628.0 C844.3 632.0 845.0 633.0 848.0 630.0 C851.0 627.0 859.8 616.5 864.0 610.0 C868.2 603.5 870.8 596.7 873.0 591.0 C875.2 585.3 876.2 582.3 877.0 576.0 C877.8 569.7 878.2 559.0 878.0 553.0 C877.8 547.0 878.3 547.2 876.0 540.0 C873.7 532.8 868.5 518.5 864.0 510.0 C859.5 501.5 855.8 496.0 849.0 489.0 C842.2 482.0 829.7 472.7 823.0 468.0 C816.3 463.3 815.3 463.3 809.0 461.0 C802.7 458.7 793.7 455.3 785.0 454.0 C776.3 452.7 761.8 452.8 757.0 453.0Z"
        fill={`url(#${id('arc')})`}
      />

      {/* Barres — pieds cachés par la vague. */}
      <rect x="664" y="591" width="38" height="110" rx="5" fill={`url(#${id('bar1')})`} />
      <rect x="719" y="550" width="38" height="150" rx="5" fill={`url(#${id('bar2')})`} />
      <rect x="773" y="509" width="38" height="190" rx="5" fill={`url(#${id('bar3')})`} />

      {/* Tour, base cachée par la vague. */}
      <path d="M458 386 L598 386 L622 640 L435 640 Z" fill={`url(#${id('tower')})`} />

      {/* Écharpe — jamais séparée de la tour. */}
      <path
        d="M558.2 444.5 L556.7 444.7 L547.6 451.0 L518.0 473.5 L496.8 491.7 L476.0 511.5 L464.2 524.3 L452.5 538.0 L442.0 551.6 L430.7 567.8 L429.1 572.0 L428.9 576.2 L428.0 580.2 L428.5 582.0 L430.3 582.7 L438.2 582.8 L447.8 584.1 L449.9 583.3 L470.5 557.8 L489.6 536.5 L515.5 510.6 L529.8 497.5 L559.1 472.8 L559.8 471.2 L559.7 460.8Z"
        fill={`url(#${id('sash')})`}
      />

      {/* Galerie : bandeau puis front, avec ses caps. */}
      <rect x="441" y="347" width="167" height="15" fill={`url(#${id('galBand')})`} />
      <rect x="441" y="362" width="167" height="23" fill={`url(#${id('galFront')})`} />
      <rect x="441" y="362" width="10" height="23" fill="#C48D32" />
      <rect x="598" y="362" width="10" height="23" fill="#FEE98D" />

      {/* Lanterne : cadre, meneau, vitres allumées. */}
      <rect x="463" y="258" width="125" height="90" fill={`url(#${id('lantern')})`} />
      <rect x="478" y="271" width="41" height="65" fill={`url(#${id('pane')})`} />
      <rect x="533" y="271" width="41" height="65" fill={`url(#${id('pane')})`} />
      <rect x="519" y="271" width="14" height="65" fill={`url(#${id('mullion')})`} />

      {/* Dôme, bandeau et fleuron. */}
      <path
        d="M452 248 C452 222 482 205 530 205 C578 205 608 222 608 248 Z"
        fill={`url(#${id('dome')})`}
      />
      <rect x="446" y="245" width="168" height="14" fill={`url(#${id('domeBand')})`} />
      <ellipse cx="530" cy="202" rx="17" ry="6" fill="#FDC834" />
      <rect x="524" y="163" width="12" height="36" rx="3" fill={`url(#${id('finial')})`} />

      {/* Écho de vague, puis la vague. */}
      <path
        d="M527.0 701.0 C520.7 697.0 499.3 687.8 482.0 682.0 C464.7 676.2 438.8 669.3 423.0 666.0 C407.2 662.7 400.7 662.2 387.0 662.0 C373.3 661.8 354.3 663.0 341.0 665.0 C327.7 667.0 319.5 669.3 307.0 674.0 C294.5 678.7 279.2 685.3 266.0 693.0 C252.8 700.7 238.8 710.7 228.0 720.0 C217.2 729.3 194.2 750.2 201.0 749.0 C207.8 747.8 247.8 721.7 269.0 713.0 C290.2 704.3 313.3 700.2 328.0 697.0 C342.7 693.8 344.2 694.3 357.0 694.0 C369.8 693.7 384.5 692.3 405.0 695.0 C425.5 697.7 463.2 707.5 480.0 710.0 C496.8 712.5 501.3 710.7 506.0 710.0 C510.7 709.3 505.7 706.7 508.0 706.0 C510.3 705.3 516.8 706.8 520.0 706.0 C523.2 705.2 533.3 705.0 527.0 701.0Z"
        fill={`url(#${id('echo')})`}
      />
      <path
        d="M201.0 730.0 C195.7 738.5 196.0 737.2 203.0 731.0 C210.0 724.8 230.2 703.3 243.0 693.0 C255.8 682.7 269.0 675.2 280.0 669.0 C291.0 662.8 297.0 660.0 309.0 656.0 C321.0 652.0 338.3 647.2 352.0 645.0 C365.7 642.8 375.3 642.0 391.0 643.0 C406.7 644.0 427.5 646.5 446.0 651.0 C464.5 655.5 474.3 658.8 502.0 670.0 C529.7 681.2 588.2 708.3 612.0 718.0 C635.8 727.7 634.3 725.5 645.0 728.0 C655.7 730.5 662.2 732.5 676.0 733.0 C689.8 733.5 711.0 733.8 728.0 731.0 C745.0 728.2 762.5 722.8 778.0 716.0 C793.5 709.2 811.2 696.8 821.0 690.0 C830.8 683.2 831.8 680.8 837.0 675.0 C842.2 669.2 850.0 658.5 852.0 655.0 C854.0 651.5 853.5 651.2 849.0 654.0 C844.5 656.8 835.5 666.3 825.0 672.0 C814.5 677.7 797.8 684.3 786.0 688.0 C774.2 691.7 767.5 693.2 754.0 694.0 C740.5 694.8 718.0 694.0 705.0 693.0 C692.0 692.0 687.5 690.8 676.0 688.0 C664.5 685.2 661.2 685.8 636.0 676.0 C610.8 666.2 550.7 639.3 525.0 629.0 C499.3 618.7 497.5 618.2 482.0 614.0 C466.5 609.8 448.8 605.7 432.0 604.0 C415.2 602.3 398.2 602.0 381.0 604.0 C363.8 606.0 342.3 612.0 329.0 616.0 C315.7 620.0 310.0 623.3 301.0 628.0 C292.0 632.7 286.0 635.3 275.0 644.0 C264.0 652.7 247.3 665.7 235.0 680.0 C222.7 694.3 206.3 721.5 201.0 730.0Z"
        fill={`url(#${id('wave')})`}
      />

      {/* Halo et point chaud, par-dessus tout. */}
      <g className="mk__lamp">
        <circle cx="526" cy="303" r="96" fill={`url(#${id('glow')})`} />
        <circle cx="498" cy="303" r="42" fill={`url(#${id('hotspot')})`} />
      </g>
    </svg>
  )
}
