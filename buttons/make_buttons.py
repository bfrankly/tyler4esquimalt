# Button sheets for a Vevor maker: 58 mm (paper cut 70 mm) and 32 mm (paper cut 44 mm), on Letter.
import math, html
FONTS='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap'
C=dict(ground='#0E1D1F',ink='#E7EFEB',arbutus='#E0703F',sun='#F0C45C',sea='#123F49',kelp='#2F6B4F',cool='#8FD0DA',dark='#10282B',muted='#A3B8B4',white='#FFFFFF')
D='"Bricolage Grotesque", Arial, sans-serif'; S='"Newsreader", Georgia, serif'
AUTH='Authorized by Tyler Russell, financial agent'
def t(x,y,txt,size,fill,font=D,weight=800,style='normal',ls=0,anchor='middle'):
    return f'<text x="{x}" y="{y}" font-family=\'{font}\' font-weight="{weight}" font-style="{style}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}">{html.escape(txt)}</text>'
def arc(cut,r,txt,size,fill,cid,bottom=True):
    # text on a circle of radius r centred; bottom arc reads left-to-right along the underside
    c=cut/2
    if bottom: path=f'M {c-r} {c} A {r} {r} 0 0 0 {c+r} {c}'
    else: path=f'M {c-r} {c} A {r} {r} 0 0 1 {c+r} {c}'
    return (f'<defs><path id="{cid}" d="{path}"/></defs>'
            f'<text font-family=\'{D}\' font-weight="600" font-size="{size}" fill="{fill}" letter-spacing="0.1"><textPath href="#{cid}" startOffset="50%" text-anchor="middle">{html.escape(txt)}</textPath></text>')
def button(cut,bg,body,uid):
    c=cut/2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{cut}mm" height="{cut}mm" viewBox="0 0 {cut} {cut}" style="display:block">'
            f'<circle cx="{c}" cy="{c}" r="{c}" fill="{bg}"/>{body}'
            f'<circle cx="{c}" cy="{c}" r="{c-0.15}" fill="none" stroke="#BBBBBB" stroke-width="0.15"/></svg>')
# ---------- 58 mm designs (cut 70, face 58, keep text within r≈26) ----------
def d58(kind,uid):
    cut=70; c=35; b=[]
    if kind=='wordmark':
        bg=C['ground']
        b.append(t(c,c-2,'Tyler',15,C['ink']))
        b.append(t(c,c+13,'Esquimalt',11.5,C['ink'],ls=-0.2))
        b.append(f'<circle cx="{c}" cy="{c+3.2}" r="4.6" fill="{C["arbutus"]}"/>'+t(c,c+6.2,'4',8.5,C['white']))
        b.append(t(c,c-13,'VOTE · SAT · OCT 17',3.6,C['sun'],weight=700,ls=0.5))
        b.append(arc(cut,28.3,AUTH,2.0,C['muted'],f'a{uid}'))
    elif kind=='vote':
        bg=C['arbutus']
        b.append(t(c,c-11,'VOTE',6,C['white'],weight=700,ls=1.2))
        b.append(t(c,c+5,'Oct 17',17,C['white'],ls=-0.4))
        b.append(t(c,c+11.6,'Saturday · Esquimalt Council',3.4,C['white'],weight=700,ls=0.3))
        b.append(t(c,c+16.4,'tyler4esquimalt.ca',3.6,C['white'],weight=700))
        b.append(arc(cut,28.3,AUTH,2.0,'#FBE3D6',f'a{uid}'))
    elif kind=='cortisol':
        bg=C['sea']
        b.append(t(c,c-11,'Toward a',7,C['ink'],font=S,weight=400,style='italic'))
        b.append(t(c,c+1,'low‑cortisol',9.6,C['sun'],ls=-0.2))
        b.append(t(c,c+11,'Esquimalt.',9.6,C['ink'],ls=-0.2))
        b.append(t(c,c+15.4,'Tyler 4 Esquimalt · Oct 17',3.4,C['muted'],weight=700))
        b.append(arc(cut,28.3,AUTH,2.0,C['muted'],f'a{uid}'))
    elif kind=='sidewalks':
        bg=C['kelp']
        b.append(t(c,c-9,'Sidewalks',10,C['ink']))
        b.append(t(c,c+1,'are where we',6.5,C['ink'],font=S,weight=400,style='italic'))
        b.append(t(c,c+9.5,'all get along.',7.5,C['sun']))
        b.append(t(c,c+15.4,'Tyler 4 Esquimalt · Oct 17',3.4,'#D6E8DC',weight=700))
        b.append(arc(cut,28.3,AUTH,2.0,'#D6E8DC',f'a{uid}'))
    elif kind=='cool':
        bg=C['cool']
        b.append(t(c,c-9,'A Right',11,C['dark']))
        b.append(t(c,c+3,'to Cool',11,C['dark']))
        b.append(t(c,c+11,'for every renter',5,C['sea'],font=S,weight=500,style='italic'))
        b.append(t(c,c+15.4,'Tyler 4 Esquimalt · Oct 17',3.4,C['sea'],weight=700))
        b.append(arc(cut,28.3,AUTH,2.0,C['sea'],f'a{uid}'))
    elif kind=='askme':
        bg=C['ground']
        b.append(t(c,c-10,"Hi, I'm Tyler.",7.5,C['sun']))
        b.append(t(c,c+1,'Ask me about',6.5,C['ink'],font=S,weight=400,style='italic'))
        b.append(t(c,c+9.5,'the traffic.',9,C['ink']))
        b.append(t(c,c+15.4,'tyler4esquimalt.ca',3.6,C['muted'],weight=700))
        b.append(arc(cut,28.3,AUTH,2.0,C['muted'],f'a{uid}'))
    return button(cut,bg,''.join(b),uid)
# ---------- 32 mm designs (cut 44, face 32, keep text within r≈12.5) ----------
def d32(kind,uid):
    cut=44; c=22; b=[]
    if kind=='wordmark':
        bg=C['ground']
        b.append(t(c,c-1.5,'Tyler',7.5,C['ink']))
        b.append(f'<circle cx="{c}" cy="{c+2.2}" r="2.6" fill="{C["arbutus"]}"/>'+t(c,c+3.9,'4',4.8,C['white']))
        b.append(t(c,c+9.5,'Esquimalt',5.6,C['ink'],ls=-0.1))
    elif kind=='vote':
        bg=C['arbutus']
        b.append(t(c,c-4.5,'VOTE',3.4,C['white'],weight=700,ls=0.8))
        b.append(t(c,c+4,'Oct 17',9,C['white'],ls=-0.2))
        b.append(t(c,c+9,'Saturday',2.8,C['white'],weight=700,ls=0.2))
    elif kind=='cortisol':
        bg=C['sea']
        b.append(t(c,c-3.5,'low‑cortisol',5.2,C['sun'],ls=-0.1))
        b.append(t(c,c+3.5,'Esquimalt',5.2,C['ink'],ls=-0.1))
        b.append(t(c,c+9,'Tyler 4 Esquimalt',2.4,C['muted'],weight=700))
    return button(cut,bg,''.join(b),uid)
# ---------- sheets (Letter 215.9 x 279.4 mm) ----------
PW,PH=215.9,279.4
def sheet(title,items):  # items: list of (x,y,svg)
    body=''.join(f'<div style="position:absolute;left:{x}mm;top:{y}mm">{s}</div>' for x,y,s in items)
    return f'''<!doctype html><html><head><meta charset="utf-8"><title>{html.escape(title)}</title>
<link rel="stylesheet" href="{FONTS}">
<style>@page{{size:letter;margin:0}} html,body{{margin:0;padding:0}} body{{width:{PW}mm;height:{PH}mm;position:relative;overflow:hidden;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.note{{position:absolute;left:10mm;top:4mm;font:3mm "Bricolage Grotesque",Arial,sans-serif;color:#888}}</style></head>
<body><div class="note">{html.escape(title)}</div>{body}</body></html>'''
def hex58(kinds):
    cut,gap=70,2.0; px=cut+gap; py=px*math.sin(math.radians(60))
    rows=4; per=2; W=cut+px+px/2; H=cut+(rows-1)*py
    x0=(PW-W)/2; y0=(PH-H)/2+2; items=[]; i=0
    for r in range(rows):
        off=px/2 if r%2 else 0
        for k in range(per):
            items.append((x0+off+k*px,y0+r*py,d58(kinds[i%len(kinds)],f'{r}{k}'))); i+=1
    return items
def grid32(kinds):
    cut,gap=44,2.0; p=cut+gap; cols,rows=4,5
    W=cut+(cols-1)*p; H=cut+(rows-1)*p; x0=(PW-W)/2; y0=(PH-H)/2+2; items=[]; i=0
    for r in range(rows):
        for k in range(cols):
            items.append((x0+k*p,y0+r*p,d32(kinds[i%len(kinds)],f'{r}{k}'))); i+=1
    return items
open('sheet-58mm-campaign.html','w').write(sheet('58 mm buttons · campaign · cut circles 70 mm · Letter',hex58(['wordmark','vote'])))
open('sheet-58mm-messages.html','w').write(sheet('58 mm buttons · messages · cut circles 70 mm · Letter',hex58(['cortisol','sidewalks','cool','askme'])))
open('sheet-32mm.html','w').write(sheet('32 mm buttons · cut circles 44 mm · Letter',grid32(['wordmark','vote','cortisol'])))
print('ok')
