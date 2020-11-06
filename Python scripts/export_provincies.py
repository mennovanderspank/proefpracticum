# Import libraries
import os
import psycopg2
import ogr

# Open database connection
conn = psycopg2.connect("host=localhost dbname=menno user=postgres password=postgres port=5432")
cur = conn.cursor()

# Create new shapefile (see https://gdal.org/drivers/vector/index.html for formats)
os.chdir('C:/Users/menno/Documents/HAS/engineer/proefpracticum/Data')
driver = ogr.GetDriverByName( 'GeoJSON' )
fOut = driver.CreateDataSource('provincies.json')

# Create layer definition
outLayer = fOut.CreateLayer('provincies', geom_type=ogr.wkbPolygon)
outLayer.CreateField(ogr.FieldDefn('provincieid', ogr.OFTInteger))
outLayer.CreateField(ogr.FieldDefn('provincienaam', ogr.OFTString))       
featureDefn = outLayer.GetLayerDefn()

# Select all rows from database
sql = 'select provincieid, provincienaam, ST_AsText(geom) from provincies'
cur.execute(sql)
rows = cur.fetchall()
i = 0

# Loop through row, create feature and write to shapefile
for row in rows :
    provincieid = int(row[0])
    provincienaam = str(row[1])
    geom = row[2]
    outFeature = ogr.Feature(featureDefn)
    outFeature.SetField('provincieid', provincieid)
    outFeature.SetField('provincienaam', provincienaam)        
    outFeature.SetGeometry(ogr.CreateGeometryFromWkt(geom))
    outLayer.CreateFeature(outFeature)
    i = i + 1

print(str(i) + ' rijen opgeslagen in json bestand')

# Close shapefile
fOut.Destroy()

# Close database connection
conn.close()

print('End of script')