from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import sys
URLS=[
 ('F1 calendar','https://www.formula1.com/en/racing/2026'),
 ('F1 driver standings','https://www.formula1.com/en/results/2026/drivers'),
 ('F1 team standings','https://www.formula1.com/en/results/2026/team'),
 ('OpenF1 sessions','https://api.openf1.org/v1/sessions?year=2026'),
]
failed=[]
for name,url in URLS:
    try:
        req=Request(url,headers={'User-Agent':'PitWall-Live-source-check/1.1'})
        with urlopen(req,timeout=25) as r:
            print(f'{name}: HTTP {r.status}')
            if r.status>=400: failed.append(name)
    except (HTTPError,URLError,TimeoutError) as e:
        print(f'{name}: FAILED {e}')
        failed.append(name)
if failed:
    print('Source verification failed:', ', '.join(failed))
    sys.exit(1)
print('All configured sources reachable.')
