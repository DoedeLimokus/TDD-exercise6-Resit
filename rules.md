Game of Life rules

1 cell (living):
    - Dies if -> neighbours < 2
    - lives if -> 2 or 3 neighbours
    - Dies if -> neighbours > 3
  
1 cell (dead):
    - Alive if -> 3 neighbours
    - stays dead if -> neighbours < 3 or neighbours > 3

Veld moet gelezen worden door RLE format:
Voorbeeld: 
#C This is a glider.
x = 3, y = 3
bo$2bo$3o!


step 1: create empty field
Step 1: Aflezen van een RLE bestand
    Aangeven hoeveel x en y is 
    aangeven wat het veld moet zijn
Step 2: Het veld tekenen
    Het veld kunnen printen en kijken of het goed is
Step 3: Cellen herkennen
    Aangeven waar cellen staan en welke positie ze hebben
Step 4: Aangeven hoeveel buren de cellen hebben 

step 5: Kijken of er cellen zijn die tot leven moeten komen

Step 6: uitslag printen
step 7: uitslag printen naar een file


Eerst moet duidelijk zijn wat de output is waar je mee wilt werken 

b = dead cell
o = alive cell
$ = end of line
! = end of file

empty field: [[b,b,b],[b,b,b],[b,b,b]... times (amount of $)]

