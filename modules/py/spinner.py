import re
import sys
from nltk.corpus import wordnet

if __name__ == '__main__':
	_input = sys.stdin.readlines()
	text = _input[0]

	pattern = r"\s*[\W]*(\w+)[\W]*\s*"
	regex = re.compile(pattern, 0)
	dif = 0;
	for match in regex.finditer(text):
		word = match.group(1)
		syns = [word]
		synsets = wordnet.synsets( word )
		
		for i,synset in enumerate(synsets):
			for j,syn in enumerate(synset.lemma_names()):
				syns.append( syn )

		unique_syns = list(set(syns))

		if(len(unique_syns) == 1):
			spintax = '{' + word + "}"
		else:
			spintax = '{'
			for x,us in enumerate(unique_syns):
				spintax += us 
				if( x == len(unique_syns)-1):
					spintax += "}"
				else:
					spintax += "|"
		text = text[0:match.start(1)+dif]+spintax+text[match.end(1)+dif:len(text)]
		dif += len(spintax)-len(word)
	print(text)
