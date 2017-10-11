import re
import os
import sys
import random
import nltk.data
import language_check
from nltk.tokenize import regexp_tokenize
from nltk.stem.porter import *
from synonyms import load

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
    
    def getlib(self, lib):
        self.wordlib = lib
        
    def getSynonyms(self, word):
        synonyms = [word]
        syns = self.wordlib.match(word, all=True)
        if(syns == None):
            return 0, []
        for syn in syns:
            synonyms.append(syn)

        s = list(set(syns))
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
                if(n == 0):
                    spintax += token+" "
                    continue
                spintax += "{"
                spintax += token
                spintax += "|"
                for x in range(n):
                    spintax += syn[x]
                    if x < n-1:
                        spintax += "|"
                    else:
                        spintax += "} "
        return spintax

class Magic:
    def __init__(self, nlib):
        self.lib = nlib
        self.tool = language_check.LanguageTool('en-US')

    def __call__(self, inp):
        s = spinner()
        s.getlib(self.lib)
        spintax = s.getSpintax(inp[0])
        spun = s.spin(spintax)
        text = spun
        matches = self.tool.check(text)
        result = language_check.correct(text, matches)
        return result

if __name__ == '__main__':
    lib   = load(open( os.getcwd() + '/modules/py/vocab.txt'))
    magic = Magic(lib)
    text  = sys.stdin.readlines()

    print( magic(text) )