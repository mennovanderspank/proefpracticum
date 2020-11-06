# Import libraries
import os
import psycopg2

# Open database connection
conn = psycopg2.connect("host=localhost dbname=menno user=postgres password=postgres port=5432")
cur = conn.cursor()

# Open file
os.chdir('C:/Users/menno/Documents/HAS/engineer/proefpracticum/Data')
csv_file = open('meteo_stations.csv')

# Loop through file and insert into database
lijn_nummer = 0
for lijn in csv_file :
    
    if lijn_nummer > 0 :
        
        # Get attributes from line
        kolom_nummer = 1
        for kolom in lijn.split(';') :
            if kolom_nummer == 1 :
                hoogte = float(kolom)
            if kolom_nummer == 2 :
                lat = float(kolom)
            if kolom_nummer == 3 :
                lon = float(kolom)
            if kolom_nummer == 4: 
                meteoid = int(kolom)
            if kolom_nummer == 5 :
                meteonaam = str(kolom).rstrip()
            kolom_nummer = kolom_nummer + 1
            
        # Insert into database
        insert_stmt = 'insert into meteostation ( meteoid, hoogte, meteonaam, geom ) values ( %s, %s, %s, ST_Transform(ST_SetSRID(ST_MakePoint(%s,%s),4326),28992))' 
        cur.execute ( insert_stmt, ( meteoid, hoogte, meteonaam, lon, lat ) )
    
    lijn_nummer = lijn_nummer + 1

print (str(lijn_nummer) + ' lijnen opgeslagen in database')

# Close file
csv_file.close()

# Commit and close database connection
conn.commit()
conn.close()

print('End of script')