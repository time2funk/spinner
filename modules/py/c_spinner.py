import re
# import sys
# import random
from nltk.corpus import wordnet

if __name__ == '__main__':

	text = "\"If\", ,you. are not pleased with the result of the trial, you have a legal time period to file a special appellate \"note\". If you want to start an appellate process, it is necessary for you to contact your legal counsel without wasting any time. At the Law Office of Yelena Sharova P.C., our civil appeal lawyers are ready to offer you help immediately.\n\nThere are many different issues that are comprised of civil appeal lawyers."

	# it = 0
	dif = 0;
	# pattern = r"\s+[\W]*(\w+)[\W]*\s*|\s*[\W]*(\w+)[\W]*\s+"
	pattern = r"\s*[\W]*(\w+)[\W]*\s*"
	regex = re.compile(pattern, 0)
	for match in regex.finditer(text):
		print(match)
		print('%02d-%02d: %s' % (match.start(), match.end(), match.group(0)))
		print('%02d-%02d: %s' % (match.start(1), match.end(1), match.group(1)))
		# print('%02d-%02d: %s' % (match.start(2), match.end(2), match.group(2)))
		
		# word = match.group(2)
		word = match.group(1)
		syns = [word]
		synsets = wordnet.synsets( word )
		
		for i,synset in enumerate(synsets):
			for j,syn in enumerate(synset.lemma_names()):
				syns.append( syn )

		# print(syns)
		unique_syns = list(set(syns))
		# print( unique_syns )

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
		# print(spintax)
		print('diff: '+str(dif))
		# text = text[0:match.start(2)+dif]+spintax+text[match.end(2)+dif:len(text)]
		text = text[0:match.start(1)+dif]+spintax+text[match.end(1)+dif:len(text)]
		# tmp = text[0:match.start(2)+dif]
		# tmp += spintax
		# tmp += text[match.end(2):len(text)+dif]
		# text = tmp
		dif += len(spintax)-len(word)

		# it=it+1
		# if( it==3 ):
		# 	break;
	print()
	print(text2)
	print()
	print(text)


	# for m in re.finditer(
	# 	r"\s+[\"\'`]*(\w+)[\.,\"\'`]*\s*|s*[\"\'`]*(\w+)[\.,\"\'`]*\s+", 
	# 	text):
	# 	print('%02d-%02d: %s' % (m.start(), m.end(), m.group(0)))
	# 	print(m)
	# 	break;

	# words = re.findall( r'\s*[\.,"\']*(\w+)[\.,"\']*\s*', text )
	# print(words)
	# print(len(words))
	# print(words[0])

	# print( syns[0].lemma_names() )
	# print( syns[1].lemma_names() )
	# print( syns[2].lemma_names() )

    # print( magic(text) )