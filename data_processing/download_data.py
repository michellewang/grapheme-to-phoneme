import urllib.request

# download CMU Pronouncing Dictionary
url_data = 'http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b'
urllib.request.urlretrieve(url_data, 'cmu_dict.txt')

# download symbols
url_symbols = 'http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b.symbols'
urllib.request.urlretrieve(url_symbols, 'cmu_symbols.txt')
