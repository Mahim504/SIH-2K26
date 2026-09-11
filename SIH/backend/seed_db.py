import pandas as pd
import sqlite3

# Tera uploaded Excel file read karega
excel_path = "SIH26122_Comprehensive_Synthetic_Dataset.xlsx"

# Connect command chaltay hi 'sih.db' naam ki FILE BAN JAYEGI
conn = sqlite3.connect("sih.db")

# Excel ki sheets ko SQLite database tables me converted kar dega
df_schedule = pd.read_excel(excel_path, sheet_name="Schedule_Activities")
df_schedule.to_sql("schedule_activities", conn, if_exists="replace", index=False)

df_train = pd.read_excel(excel_path, sheet_name="Train_Updates")
df_train.to_sql("train_updates", conn, if_exists="replace", index=False)

conn.close()
print("🎉 Success! Tera local database file 'sih.db' ready ho gaya hai!")