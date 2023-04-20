from enum import Enum


class Language(Enum):
    Arabic = "Arabic"
    English = "English"
    French = "French"
    # you can add more languages here


class BrailleAlphabet:
    def __init__(self, name, grade1_map, grade2_map):
        self.name = name
        self.grade1_map = grade1_map
        self.grade2_map = grade2_map


english_alphabet = BrailleAlphabet(
    name=Language.English,
    grade1_map={
        'alpha': {
            'alpha': '⠰', 'capital_word': "⠠⠠",
            'capital_terminator': "⠠⠄", 'capital_symbol': "⠠",
            'a': '⠁', 'b': '⠃', 'c': '⠉',
            'd': '⠙', 'e': '⠑', 'f': '⠋',
            'g': '⠛', 'h': '⠓', 'i': '⠊',
            'j': '⠚', 'k': '⠅', 'l': '⠇',
            'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗',
            's': '⠎', 't': '⠞', 'u': '⠥',
            'v': '⠧', 'w': '⠺', 'x': '⠭',
            'y': '⠽', 'z': '⠵', },
        "numeric": {
            'numeric': '⠼',
            '0': '⠚', '1': '⠁', '2': '⠃',
            '3': '⠉', '4': '⠙', '5': '⠑',
            '6': '⠋', '7': '⠛', '8': '⠓',
            '9': '⠊',
        },
        "char": {
            ',': '⠂', ';': '⠆', ':': '⠒',
            '.': '⠲', '?': '⠦', '!': '⠖',
            '"': '⠠⠶', '\'': '⠄', '(': '⠐⠣',
            ')': '⠐⠜', '/': '⠸⠌', '-': '⠤',
            '_': '⠨⠤', '&': '⠈⠯', '*': '⠐⠔',
            '@': '⠈⠁', '%': '⠨⠴', '+': '⠐⠖',
            '−': '⠐⠤', '=': '⠐⠶', '×': '⠐⠦',
            '÷': '⠐⠌', '>': '⠈⠜', '<': '⠈⠣',
            '$': '⠈⠎', '#': '⠸⠹', '~': '⠈⠔',
            '`': '⠨⠡', '^': '⠈⠢', '{': '⠸⠣',
            '}': '⠸⠜', '[': '⠨⠣', ']': '⠨⠜',
            '\\': '⠸⠡', '|': '⠸⠳', ' ': ' ',
        }
    },
    grade2_map={
        'alpha': {
            'alpha': '⠰', 'capital_word': "⠠⠠",
            'capital_terminator': "⠠⠄", 'capital_symbol': "⠠",
            'a': '⠁', 'b': '⠃', 'c': '⠉',
            'd': '⠙', 'e': '⠑', 'f': '⠋',
            'g': '⠛', 'h': '⠓', 'i': '⠊',
            'j': '⠚', 'k': '⠅', 'l': '⠇',
            'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗',
            's': '⠎', 't': '⠞', 'u': '⠥',
            'v': '⠧', 'w': '⠺', 'x': '⠭',
            'y': '⠽', 'z': '⠵',
            'ALOHA': '⠨⠴⠼⠁⠃⠈⠎⠁⠁⠠⠠⠁⠁⠠⠄⠁⠁⠈⠎⠼⠑⠰⠃⠠⠠⠃⠃⠃⠼⠑⠑⠈⠢',
        },
        'numeric': {
            'numeric': '⠼',
            '0': '⠚', '1': '⠁', '2': '⠃',
            '3': '⠉', '4': '⠙', '5': '⠑',
            '6': '⠋', '7': '⠛', '8': '⠓',
            '9': '⠊',
        },
        'char': {
            ',': '⠂', ';': '⠆', ':': '⠒',
            '.': '⠲', '?': '⠦', '!': '⠖',
            '"': '⠠⠶', '\'': '⠄', '(': '⠐⠣',
            ')': '⠐⠜', '/': '⠸⠌', '-': '⠤',
            '_': '⠨⠤', '&': '⠈⠯', '*': '⠐⠔',
            '@': '⠈⠁', '%': '⠨⠴', '+': '⠐⠖',
            '−': '⠐⠤', '=': '⠐⠶', '×': '⠐⠦',
            '÷': '⠐⠌', '>': '⠈⠜', '<': '⠈⠣',
            '$': '⠈⠎', '#': '⠸⠹', '~': '⠈⠔',
            '`': '⠨⠡', '^': '⠈⠢', '{': '⠸⠣',
            '}': '⠸⠜', '[': '⠨⠣', ']': '⠨⠜',
            '\\': '⠸⠡', '|': '⠸⠳', ' ': ' ',
        },
        'standalone': {
            'about': 'ab',
            'above': 'abv',
            'according': 'ac',
            'across': 'acr',
            'after': 'af',
            'afternoon': 'afn',
            'afterward': 'afw',
            'again': 'ag',
            'against': 'ag⠌',
            'also': 'al',
            'almost': 'alm',
            'already': 'alr',
            'although': 'al⠹',
            'altogether': 'alt',
            'always': 'alw',
            'and': '⠯',
            'ar': '⠜',
            'because': '⠆c',
            'before': '⠆f',
            'behind': '⠆h',
            'below': '⠆l',
            'beneath': '⠆n',
            'beside': '⠆s',
            'between': '⠆t',
            'beyond': '⠆y',
            'blind': 'bl',
            'braille': 'brl',
            'character': '⠐⠡',
            'children': '⠡n',
            'conceive': '⠒cv',
            'conceiving': '⠒cvg',
            'could': 'cd',
            'day': '⠐d',
            'deceive': 'dcv',
            'deceiving': 'dcvg',
            'declare': 'dcl',
            'declaring': 'dclg',
            'either': 'ei',
            'here': '⠐h',
            'herself': 'h⠻f',
            'him': 'hm',
            'himself': 'hmf',
            'his': 'hs',
            'however': 'hv',
            'make': '⠍⠏',
            'making': '⠍⠏g',
            'many': '⠍⠉',
            'may': '⠍⠽',
            'me': '⠍',
            'meaning': '⠍⠑',
            'more': '⠍⠗',
            'most': '⠍⠙',
            'much': '⠍⠥',
            'must': '⠍⠥⠞',
            'my': '⠍⠽',
            'but': 'b',
            'can': 'c',
            'be': '⠆',
            'as': 'z',
            'cannot': '⠸c',
            'child': '⠡',
            'do': 'd',
            'enough': '⠢',
            'ever': '⠐e',
            'every': 'e',
            'father': '⠐f',
            'first': 'f⠌',
            'for': '⠿',
            'friend': 'fr',
            'from': 'f',
            'go': 'g',
            'good': 'gd',
            'great': 'grt',
            'had': '⠸h',
            'have': 'h',
            'i': 'i',
            'if': '⠌',
            'important': '⠐⠔',
            'importantly': '⠐⠔l',
            'in': 'i',
            'include': '⠐⠝',
            'including': '⠐⠝g',
            'indeed': '⠐⠝d',
            'introduce': '⠐⠝r',
            'introducing': '⠐⠝rg',
            'is': '⠌',
            'it': 'x',
            'itself': '⠊⠖',
            'just': '⠈⠤',
            'knowledge': '⠅⠪',
            'l': 'l',
            'let': '⠇⠕',
            'letting': '⠇⠕g',
            'like': 'l',
            'little': '⠇⠑',
            'long': '⠇⠛',
            'lower': '⠇⠕r',
            'lord': '⠐l',
            'm': 'm',
            'n': 'n',
            'name': '⠝⠁',
            'necessarily': '⠝⠉⠎',
            'neither': '⠝⠑',
            'next': '⠝⠭',
            'no': '⠝⠕',
            'not': '⠝⠞',
            'nothing': '⠝⠞⠥',
            'now': '⠝⠕',
            'o': 'o',
            'object': '⠕⠛',
            'objection': '⠕⠛⠬',
            'objects': '⠕⠛⠉',
            'observe': '⠕⠋',
            'observing': '⠕⠋g',
            'obvious': '⠕⠃',
            'obviously': '⠕⠃l',
            'of': '⠋',
            'often': '⠋⠥',
            'on': '⠗',
            'once': '⠋⠙',
            'one': '⠋⠝',
            'only': '⠋⠇',
            'or': '⠬',
            'other': '⠋⠗⠗',
            'our': '⠋⠥',
            'out': '⠋⠥',
            'p': 'p',
            'part': '⠏⠁',
            'particularly': '⠏⠁l',
            'people': '⠏⠑⠛',
            'perceive': '⠏⠃',
            'perceiving': '⠏⠃g',
            'perhaps': '⠏⠛',
            'plain': '⠏⠇',
            'please': '⠏⠇⠑',
            'point': '⠏⠕⠋',
            'possible': '⠏⠥⠐',
        },
        'group_sign': {
            r'be': r'⠆',
            r'cc': r'⠒',
            r'tion': r'⠰⠝',
            'ance': '⠨e',
            'bb': '⠆',
            'be': '⠆',
            'cc': '⠒',
            'ch': '⠡',
            'con': '⠒',
            'dis': '⠲',
            'ea': '⠂',
            'ed': '⠫',
            'en': '⠢',
            'ence': '⠰e',
            'er': '⠻',
            'ff': '⠖',
            'ful': '⠰l',
            'gg': '⠶',
            'gh': '⠣',
        }
    }
)

french_alphabet = BrailleAlphabet(
    name=Language.French,
    grade1_map={
        'alpha': {
            'alpha': "⠰", 'capital_word': "⠨⠨",
            'capital_terminator': "⠠⠄", 'capital_symbol': "⠨",
            'a': '⠁', 'b': '⠃', 'c': '⠉',
            'd': '⠙', 'e': '⠑', 'f': '⠋',
            'g': '⠛', 'h': '⠓', 'i': '⠊',
            'j': '⠚', 'k': '⠅', 'l': '⠇',
            'm': '⠍', 'n': '⠝', 'o': '⠕',
            'p': '⠏', 'q': '⠟', 'r': '⠗',
            's': '⠎', 't': '⠞', 'u': '⠥',
            'v': '⠧', 'w': '⠺', 'x': '⠭',
            'y': '⠽', 'z': '⠵', 'à': '⠷',
            'â': '⠡', 'é': '⠿', 'è': '⠮',
            'ê': '⠣', 'ë': '⠫', 'î': '⠩',
            'ï': '⡋', 'ô': '⠹', 'ù': '⠾',
            'û': '⠱', 'ü': '⠳', 'œ': '⠪',

        },
        "numeric": {
            'numeric': '⠠',
            '0': '⠼', '1': '⠡', '2': '⠣',
            '3': '⠩', '4': '⠹', '5': '⠱',
            '6': '⠫', '7': '⠻', '8': '⠳',
            '9': '⠪',
        },
        "char": {
            ' ': '⠀', '.': '⠲', ',': '⠂',
            ';': '⠆', ':': '⠒', '!': '⠖',
            '-': '⠤', '(': '⠦', ')': '⠴',
            '\'': '⠄', '/': '⠌', '&': '⠐⠿',
            '#': '⠐⠼', '@': '⠜', '*': '⠔',
            '+': '⠠⠖', '=': '⠠⠶', '<': '⠐⠣',
            '>': '⠐⠜', '$': '⠘⠎', '%': '⠐⠬',
            '^': '⠈', '_': '⠐⠤', '{': '⠠⠠⠦',
            '}': '⠴⠄⠄', '[': '⠘⠦', ']': '⠴⠃',
            '|': '⠸', '\\': '⠐⠌'},
    },
    grade2_map={
        '1': '⠁',
        '2': '⠃',
        '3': '⠉',
        # and so on...
    }
)
arabic_alphabet = BrailleAlphabet(
    name=Language.Arabic,
    grade1_map={
        'alpha': {
            'alpha': "⠰",
            'ا': '⠁', 'ب': '⠃', 'ت': '⠞',
            'ث': '⠹', 'ج': '⠚', 'ح': '⠱',
            'خ': '⠭', 'د': '⠙', 'ذ': '⠮',
            'ر': '⠗', 'ز': '⠵', 'س': '⠎',
            'ش': '⠩	', 'ص': '⠯', 'ض': '⠫',
            'ظ': '⠿	', 'ع': '⠷', 'غ': '⠣',
            'ف': '⠋', 'ق': '⠟', 'ك': '⠅',
            'ل': '⠇', 'م': '⠍', 'ن': '⠝	',
            'ه': '⠓', 'و': '⠺', 'ي': '⠊',
            'ة': '⠡', 'لا': '⠧', 'ى': '⠕',
            'ء': '⠄', 'أ': '⠌', 'إ': '⠅',
            'ؤ': '⠳', 'ئ': '⠽', 'آ': '⠜',
            'لا': '⠧', 'ء': '⠄', 'أ': '⠌',
            'إ': '⠨', 'ؤ': '⠳', 'ئ': '⠽',
            'ط': '⠾',
        },
        "numeric": {
            'numeric': '⠼',
            '0': '⠁', '1': '⠃', '2': '⠉',
            '3': '⠙', '4': '⠑', '5': '⠋',
            '6': '⠛', '7': '⠓', '8': '⠊',
            '9': '⠚',
        },
        "char": {
            ' ': '⠀', '.': '⠲', ',': '⠂',
            ';': '⠐⠆', ':': '⠐⠂', '!': '⠖',
            '-': '⠤⠤', '(': '⠦', ')': '⠴',
            '\'': '⠄', '/': '⠸⠤', '&': '⠈⠯',
            '#': '⠸⠔', '@': '⠈⠁', '*': '⠰⠔',
            '+': '⠰⠖', '=': '⠰⠶', '<': '⠘⠢',
            '>': '⠘⠔', '$': '⠈⠲', '%': '⠒⠏',
            '^': '⠈⠢', '_': '⠠⠤', '{': '⠐⠦',
            '}': '⠴⠂', '[': '⠠⠦', ']': '⠴⠄',
            '|': '⠸⠒', '\\': '⠘⠤',
            ' ': ' ', '،': '⠐', '؛': '⠰',
            ':': '⠐⠂', '.': '⠲', '؟': '⠦',
            '!': '⠖', '“': '⠶', '”': '⠶',
            '«': '⠶', '»': '⠶', '(': '⠦',
            ')': '⠴', 'ـ': '⠤', '%': '⠒⠏',
            '`': '⠈', 'ﻹ': '⠇⠨', 'ﻷ': '⠇⠌',
            'ﻵ': '⠇⠜', '×': '⠰⠦', '÷': '⠰⠲',
            '"': '⠶', '~': '⠘⠒',
        }
    },
    grade2_map={
        '1': '⠁',
        '2': '⠃',
        '3': '⠉',
        # and so on...
    }
)


class Dictionary(Enum):
    English = english_alphabet
    French = french_alphabet
    Arabic = arabic_alphabet
    # add Braille alphabets here
