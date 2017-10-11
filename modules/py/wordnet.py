import re
import sys
import random
from nltk.corpus import wordnet
from nltk.tokenize import regexp_tokenize
import nltk.data
from nltk.stem.porter import *
import language_check

class spinner( object ):
    def spin(self, s):
        while True:
            s, n = re.subn('{([^{}]*)}',
                        lambda m: random.choice(m.group(1).split("|")),
                        s)
            if n == 0: break
        return s.strip()
    
    def splitToSentences(self, content):
        tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
        return tokenizer.tokenize(content)
    
    def getSynonyms(self, word):
        synonyms = [word]
        for syn in wordnet.synsets(word):
            for lemma in syn.lemma_names():
                if lemma != word:
                    w, n = re.subn("_", " ", lemma)
                    synonyms.append(w)
        s = list(set(synonyms))
        return len(s), s
    
    def getSpintax(self, text):
        sentences = self.splitToSentences(text)
        stemmer = PorterStemmer()
        spintax = ""
        for sentence in sentences:
            tokens = regexp_tokenize(sentence, "[\w']+")
            for token in tokens:
                stem = stemmer.stem(token)
                n, syn = self.getSynonyms(stem)
                spintax += "{"
                spintax += token
                spintax += "|"
                for x in range(n):
                    spintax += syn[x]
                    if x < n-1:
                        spintax += "|"
                    else:
                        spintax += "} "
            spintax += ". "
        return spintax

class Magic:
    def __init__(self):
        self.tool = language_check.LanguageTool('en-US')
    
    def __call__(self, inp):
        s = spinner()
        spintax = s.getSpintax(inp[0])
        # spintax = s.getSpintax(inp)
        # print( spintax )
        spun = s.spin(spintax)
        text = spun
        matches = self.tool.check(text)
        result = language_check.correct(text, matches)
        return result

if __name__ == '__main__':
    # text = "a plugin to create windows like context menu with keyboard interaction"
    magic = Magic()
    text  = sys.stdin.readlines()

    print( magic(text) )