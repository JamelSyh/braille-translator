

const layout = {
  default: [
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{space}'
  ],
  default_shift: [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '{space}'
  ],
  auto_1: [
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{space}'
  ],
  auto_1_shift: [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '{space}'
  ],
  "1_auto": [
    '⠨⠡ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤ ⠐⠶ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨⠣ ⠨⠜ ⠸⠡',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠆ ⠄ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠂ ⠲ ⠸⠌ {shift}',
    '@ {space}'

  ],
  "1_auto_shift": [
    '⠈⠔ ⠖ ⠈⠁ ⠸⠹ ⠈⠎ ⠨⠴ ⠈⠢ ⠈⠯ ⠐⠔ ⠐⠣ ⠐⠜ ⠨⠤ ⠐⠖ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠸⠣ ⠸⠜ ⠸⠳',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠒ ⠠⠶ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠈⠣ ⠈⠜ ⠰⠦ {shift}',
    '@ {space}'
  ],
  en_1: [
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{space}'
  ],
  en_1_shift: [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '{space}'
  ],
  "1_en": [
    '⠨⠡ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤ ⠐⠶ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨⠣ ⠨⠜ ⠸⠡',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠆ ⠄ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠂ ⠲ ⠸⠌ {shift}',
    '@ {space}'

  ],
  "1_en_shift": [
    '⠈⠔ ⠖ ⠈⠁ ⠸⠹ ⠈⠎ ⠨⠴ ⠈⠢ ⠈⠯ ⠐⠔ ⠐⠣ ⠐⠜ ⠨⠤ ⠐⠖ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠸⠣ ⠸⠜ ⠸⠳',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠒ ⠠⠶ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠈⠣ ⠈⠜ ⠰⠦ {shift}',
    '@ {space}'
  ],
  fr_1: [
    "` 1 2 3 4 5 6 7 8 9 0 \u00B0 + {bksp}",
    "{tab} a z e r t y u i o p ^ $",
    "{lock} q s d f g h j k l m \u00F9 * {enter}",
    "{shift} < w x c v b n , ; : ! {shift}",
    "{space}",
  ],
  fr_1_shift: [
    "\u00B2 & \u00E9 \" ' ( - \u00E8 _ \u00E7 \u00E0 ) = {bksp}",
    "{tab} A Z E R T Y U I O P \u00A8 \u00A3",
    "{lock} Q S D F G H J K L M % \u00B5 {enter}",
    "{shift} > W X C V B N ? . / \u00A7 {shift}",
    "{space}",
  ],
  "1_fr": [
    "⠠ ⠡ ⠣ ⠩ ⠹ ⠱ ⠫ ⠻ ⠳ ⠪ ⠼ ⠐⠕ ⠠⠖ {bksp}",
    "{tab} ⠁ ⠵ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠈ ⠘⠎",
    "{lock} ⠟ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠍ ⠾ ⠠⠔ {enter}",
    "{shift} ⠐⠣ ⠺ ⠭ ⠉ ⠧ ⠃ ⠝ ⠂ ⠆ ⠒ ⠰⠖ {shift}",
    "@ {space}",
  ],
  "1_fr_shift": [
    "⠈⠣ ⠐⠿ ⠰⠿ ⠄ ⠰⠦ ⠰⠤ ⠰⠮ ⠐⠤ ⠰⠯ ⠷ ⠰⠴ ⠠⠶ {bksp}",
    "{tab} ⠁ ⠵ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨ ⠘⠇",
    "{lock} ⠟ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠍ ⠐⠬ ⠘⠍ {enter}",
    "{shift} ⠐⠜ ⠺ ⠭ ⠉ ⠧ ⠃ ⠝ ⠰⠢ ⠲ ⠠⠌ ⠐⠏ {shift}",
    "@ {space}",
  ],
  ar_1: [
    "\u0630 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} \u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \\",
    "{lock} \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 {enter}",
    "{shift} \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649 \u0629 \u0648 \u0632 \u0638 {shift}",
    "{space}",
  ],
  ar_1_shift: [
    "\u0651 ! @ # $ % ^ & * ) ( _ + {bksp}",
    "{tab} \u064E \u064B \u064F \u064C \u0644\u0625 \u0625 \u2018 \u00F7 \u00D7 \u061B < > |",
    '{lock} \u0650 \u064D ] [ \u0644\u0623 \u0623 \u0640 \u060C / : " {enter}',
    "{shift} ~ \u0652 } { \u0644\u0622 \u0622 \u2019 , . \u061F {shift}",
    "{space}",
  ],
  "1_ar": [
    "⠮ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤⠤ ⠰⠶ {bksp}",
    "{tab} ⠫ ⠯ ⠹ ⠟ ⠋ ⠣ ⠷ ⠓ ⠭ ⠱ ⠚ ⠙ ⠘⠤",
    "{lock} ⠩ ⠎ ⠊ ⠃ ⠇ ⠁ ⠞ ⠝ ⠍ ⠅ ⠾ {enter}",
    "{shift} ⠽ ⠄ ⠳ ⠗ ⠧ ⠕ ⠡ ⠺ ⠵ ⠿ {shift}",
    "@ {space}",
  ],
  "1_ar_shift": [
    "⠠ ⠖ ⠈⠁ ⠸⠔ ⠈⠲ ⠒⠏ ⠈⠢ ⠈⠯ ⠰⠔ ⠴ ⠦ ⠠⠤ ⠰⠖ {bksp}",
    "{tab} ⠂ ⠆ ⠥ ⠢ ⠇⠨ ⠨ ⠄ ⠰⠲ ⠰⠦ ⠐⠆ ⠘⠢ ⠘⠔ ⠸⠒",
    '{lock} ⠑ ⠔ ⠴⠄ ⠠⠦ ⠇⠌ ⠌ ⠒⠒ ⠐ ⠸⠤ ⠐⠂ ⠶ {enter}',
    "{shift} ⠘⠒ ⠒ ⠴⠂ ⠐⠦ ⠇⠜ ⠜ ⠄ ⠂ ⠲ ⠦ {shift}",
    "@ {space}",
  ],
  auto_2: [
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{space}'
  ],
  auto_2_shift: [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '{space}'
  ],
  "2_auto": [
    '⠨⠡ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤ ⠐⠶ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨⠣ ⠨⠜ ⠸⠡',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠆ ⠄ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠂ ⠲ ⠸⠌ {shift}',
    '@ {space}'

  ],
  "2_auto_shift": [
    '⠈⠔ ⠖ ⠈⠁ ⠸⠹ ⠈⠎ ⠨⠴ ⠈⠢ ⠈⠯ ⠐⠔ ⠐⠣ ⠐⠜ ⠨⠤ ⠐⠖ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠸⠣ ⠸⠜ ⠸⠳',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠒ ⠠⠶ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠈⠣ ⠈⠜ ⠰⠦ {shift}',
    '@ {space}'
  ],
  en_2: [
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{space}'
  ],
  en_2_shift: [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '{space}'
  ],
  "2_en": [
    '⠨⠡ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤ ⠐⠶ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨⠣ ⠨⠜ ⠸⠡',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠆ ⠄ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠂ ⠲ ⠸⠌ {shift}',
    '@ {space}'

  ],
  "2_en_shift": [
    '⠈⠔ ⠖ ⠈⠁ ⠸⠹ ⠈⠎ ⠨⠴ ⠈⠢ ⠈⠯ ⠐⠔ ⠐⠣ ⠐⠜ ⠨⠤ ⠐⠖ {bksp}',
    '{tab} ⠟ ⠺ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠸⠣ ⠸⠜ ⠸⠳',
    '{lock} ⠁ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠒ ⠠⠶ {enter}',
    '{shift} ⠵ ⠭ ⠉ ⠧ ⠃ ⠝ ⠍ ⠈⠣ ⠈⠜ ⠰⠦ {shift}',
    '@ {space}'
  ],
  fr_2: [
    "` 1 2 3 4 5 6 7 8 9 0 \u00B0 + {bksp}",
    "{tab} a z e r t y u i o p ^ $",
    "{lock} q s d f g h j k l m \u00F9 * {enter}",
    "{shift} < w x c v b n , ; : ! {shift}",
    "{space}",
  ],
  fr_2_shift: [
    "\u00B2 & \u00E9 \" ' ( - \u00E8 _ \u00E7 \u00E0 ) = {bksp}",
    "{tab} A Z E R T Y U I O P \u00A8 \u00A3",
    "{lock} Q S D F G H J K L M % \u00B5 {enter}",
    "{shift} > W X C V B N ? . / \u00A7 {shift}",
    "{space}",
  ],
  "2_fr": [
    "⠠ ⠡ ⠣ ⠩ ⠹ ⠱ ⠫ ⠻ ⠳ ⠪ ⠼ ⠐⠕ ⠠⠖ {bksp}",
    "{tab} ⠁ ⠵ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠈ ⠘⠎",
    "{lock} ⠟ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠍ ⠾ ⠠⠔ {enter}",
    "{shift} ⠐⠣ ⠺ ⠭ ⠉ ⠧ ⠃ ⠝ ⠂ ⠆ ⠒ ⠰⠖ {shift}",
    "@ {space}",
  ],
  "2_fr_shift": [
    "⠈⠣ ⠐⠿ ⠰⠿ ⠄ ⠰⠦ ⠰⠤ ⠰⠮ ⠐⠤ ⠰⠯ ⠷ ⠰⠴ ⠠⠶ {bksp}",
    "{tab} ⠁ ⠵ ⠑ ⠗ ⠞ ⠽ ⠥ ⠊ ⠕ ⠏ ⠨ ⠘⠇",
    "{lock} ⠟ ⠎ ⠙ ⠋ ⠛ ⠓ ⠚ ⠅ ⠇ ⠍ ⠐⠬ ⠘⠍ {enter}",
    "{shift} ⠐⠜ ⠺ ⠭ ⠉ ⠧ ⠃ ⠝ ⠰⠢ ⠲ ⠠⠌ ⠐⠏ {shift}",
    "@ {space}",
  ],
  ar_2: [
    "\u0630 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} \u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \\",
    "{lock} \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 {enter}",
    "{shift} \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649 \u0629 \u0648 \u0632 \u0638 {shift}",
    "{space}",
  ],
  ar_2_shift: [
    "\u0651 ! @ # $ % ^ & * ) ( _ + {bksp}",
    "{tab} \u064E \u064B \u064F \u064C \u0644\u0625 \u0625 \u2018 \u00F7 \u00D7 \u061B < > |",
    '{lock} \u0650 \u064D ] [ \u0644\u0623 \u0623 \u0640 \u060C / : " {enter}',
    "{shift} ~ \u0652 } { \u0644\u0622 \u0622 \u2019 , . \u061F {shift}",
    "{space}",
  ],
  "2_ar": [
    "⠮ ⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠤⠤ ⠰⠶ {bksp}",
    "{tab} ⠫ ⠯ ⠹ ⠟ ⠋ ⠣ ⠷ ⠓ ⠭ ⠱ ⠚ ⠙ ⠘⠤",
    "{lock} ⠩ ⠎ ⠊ ⠃ ⠇ ⠁ ⠞ ⠝ ⠍ ⠅ ⠾ {enter}",
    "{shift} ⠽ ⠄ ⠳ ⠗ ⠧ ⠕ ⠡ ⠺ ⠵ ⠿ {shift}",
    "@ {space}",
  ],
  "2_ar_shift": [
    "⠠ ⠖ ⠈⠁ ⠸⠔ ⠈⠲ ⠒⠏ ⠈⠢ ⠈⠯ ⠰⠔ ⠴ ⠦ ⠠⠤ ⠰⠖ {bksp}",
    "{tab} ⠂ ⠆ ⠥ ⠢ ⠇⠨ ⠨ ⠄ ⠰⠲ ⠰⠦ ⠐⠆ ⠘⠢ ⠘⠔ ⠸⠒",
    '{lock} ⠑ ⠔ ⠴⠄ ⠠⠦ ⠇⠌ ⠌ ⠒⠒ ⠐ ⠸⠤ ⠐⠂ ⠶ {enter}',
    "{shift} ⠘⠒ ⠒ ⠴⠂ ⠐⠦ ⠇⠜ ⠜ ⠄ ⠂ ⠲ ⠦ {shift}",
    "@ {space}",
  ],

  "more": [
    '⠁ ⠂ ⠃ ⠄ ⠅ ⠆ ⠇ ⠈ ⠉ ⠊ ⠋ ⠌ ⠍ ⠎ ⠏ {bksp}',
    '⠐ ⠑ ⠒ ⠓ ⠔ ⠕ ⠖ ⠗ ⠘ ⠙ ⠚ ⠛ ⠜ ⠝ ⠞ ⠟',
    '⠠ ⠡ ⠢ ⠣ ⠤ ⠥ ⠦ ⠧ ⠨ ⠩ ⠪ ⠫ ⠬ ⠭ ⠮ ⠯',
    '⠰ ⠱ ⠲ ⠳ ⠴ ⠵ ⠶ ⠷ ⠸ ⠹ ⠺ ⠻ ⠼ ⠽ ⠾ ⠿',
    '@ {space}'
  ]
}

export default layout;
