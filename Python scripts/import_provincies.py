# Import bibliotheken
import os, sys
import psycopg2

# Import ogr to read shapefile
import ogr

# Get driver for file type (list of codes: http://www.gdal.org/ogr_formats.html)
driver = ogr.GetDriverByName('ESRI Shapefile')

# Make database connection
conn = psycopg2.connect("host=localhost dbname=menno user=postgres password=postgres port=5432")

# Get cursor
cur = conn.cursor()

# Go to directory
os.chdir('C:/Users/menno/Documents/HAS/engineer/proefpracticum/Data')

# Open shape file
fIn = driver.Open('provincies.shp', 0)

# Get layer from shape file
layer = fIn.GetLayer(0)

# Loop over features
# i = 0
for feature in layer:

    # Get attribute values
    # i = i + 1
    provincieid = feature.GetFieldAsInteger('id')
    provincienaam = feature.GetFieldAsString('naam')
    geometrie = feature.GetGeometryRef()
    wkt_geometrie = str(geometrie.ExportToWkt())
    
    # Insert row into database, convert wkt from epsg 28992 to 4326
    insert_stmt = 'insert into provincies ( provincieid, provincienaam, geom ) values ( %s, %s, ST_GeomFromText(%s, 28992) )' 
    cur.execute ( insert_stmt, ( provincieid, provincienaam, wkt_geometrie ) )
    print ('Provincienaam ' + str(provincienaam) + ' inserted')

    # Destroy feature and get next feature
    feature.Destroy()

# Close file
fIn.Destroy()    

# Commit and close database connection
conn.commit()
conn.close()

print('End of script')