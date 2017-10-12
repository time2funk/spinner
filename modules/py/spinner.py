import re
import sys
import random
from nltk.corpus import wordnet
from nltk.tokenize import regexp_tokenize
import nltk.data
from nltk.stem.porter import *
import language_check

# class spinner( object ):
#     def spin(self, s):
#         while True:
#             s, n = re.subn('{([^{}]*)}',
#                         lambda m: random.choice(m.group(1).split("|")),
#                         s)
#             if n == 0: break
#         return s.strip()
    
#     def splitToSentences(self, content):
#         tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
#         return tokenizer.tokenize(content)
    
#     def getSynonyms(self, word):
#         synonyms = [word]
#         for syn in wordnet.synsets(word):
#             for lemma in syn.lemma_names():
#                 if lemma != word:
#                     w, n = re.subn("_", " ", lemma)
#                     synonyms.append(w)
#         s = list(set(synonyms))
#         return len(s), s
    
#     def getSpintax(self, text):
#         sentences = self.splitToSentences(text)
#         stemmer = PorterStemmer()
#         spintax = ""
#         for sentence in sentences:
#             tokens = regexp_tokenize(sentence, "[\w']+")
#             for token in tokens:
#                 stem = stemmer.stem(token)
#                 n, syn = self.getSynonyms(stem)
#                 spintax += "{"
#                 spintax += token
#                 spintax += "|"
#                 for x in range(n):
#                     spintax += syn[x]
#                     if x < n-1:
#                         spintax += "|"
#                     else:
#                         spintax += "} "
#             spintax += ". "
#         return spintax

# class Magic:
#     def __init__(self):
#         self.tool = language_check.LanguageTool('en-US')

#     def getSynonyms(self, word):
#         synonyms = [word]
#         for syn in wordnet.synsets(word):
#             for lemma in syn.lemma_names():
#                 if lemma != word:
#                     w, n = re.subn("_", " ", lemma)
#                     synonyms.append(w)

#         s = list(set(synonyms))
#         return len(s), s

#     def splitToWord(self, content):
#         tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
#         return tokenizer.tokenize(content)
        
#     def __call__(self, inp):

#         sentences = self.splitToSentences(text)

#         spintax = s.getSpintax(inp[0])
#         spun = s.spin(spintax)
#         text = spun

#         matches = self.tool.check(text)
#         result = language_check.correct(text, matches)
#         return result

if __name__ == '__main__':
    # magic = Magic()
    # text  = sys.stdin.readlines()
	text = "If you are not pleased with the result of the trial, you have a legal time period to file a special appellate \"note\". If you want to start an appellate process, it is necessary for you to contact your legal counsel without wasting any time. At the Law Office of Yelena Sharova P.C., our civil appeal lawyers are ready to offer you help immediately.\n\nThere are many different issues that are comprised of civil appeal lawyers."
	words = re.split( r'\s', text )

	print(words)
	print(words[22])

	word = re.search( r'(\w+)', words[22] )

	print( word )
	print( word.group(0) )
	print( word.start() )
	print( word.end() )

	synsets = wordnet.synsets( word.group(0) )
	#     for syn in wordnet.synsets(word):
	# for lemma in syn.lemma_names()
	spintax = '{' + word.group(0) + "|"

	for i,synset in enumerate(synsets):
		for j,syn in enumerate(synset.lemma_names()):
			if syn != word.group(0):
				spintax += syn
				if( i == len(synsets)-1 and j == len(synset.lemma_names())-1 ):
					spintax += '}'
				else:
					spintax += '|'

	result = re.sub()

	print( spintax )
	print(  )
	print( result )
	# print( syns[0].lemma_names() )
	# print( syns[1].lemma_names() )
	# print( syns[2].lemma_names() )

    # print( magic(text) )