import requests
from bs4 import BeautifulSoup
import json
import schedule
import time
from datetime import datetime

def scrape_scholarships():
    try:
        # Define the search URL
        search_url = "https://www.buddy4study.com/scholarships"
        
        # Send a GET request to the URL
        response = requests.get(search_url)
        response.raise_for_status()  # Raise an error for bad responses
        
        # Parse the HTML content with Beautiful Soup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Parse the search results
        results = []
        scholarships = soup.select('.card.scholarship-card')
        
        for scholarship in scholarships:
            try:
                title = scholarship.select_one('.scholarship-card__title').text.strip()
                link = scholarship.select_one('a')['href']
                description = scholarship.select_one('.scholarship-card__description').text.strip()
                dates = scholarship.select_one('.scholarship-card__date').text.split('-')
                starting_date = dates[0].strip()
                ending_date = dates[1].strip() if len(dates) > 1 else "Not available"
                
                results.append({
                    "title": title,
                    "apply_link": link,
                    "description": description,
                    "starting_date": starting_date,
                    "ending_date": ending_date
                })
            except Exception as e:
                print(f"Error parsing scholarship: {e}")
        
        # Save the results to a JSON file
        with open('scholarships.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=4)

        print(f"Scraping completed at {datetime.now()}")
        for result in results:
            print(result)  # Print each result for verification
    except Exception as e:
        print(f"Error during scraping: {e}")

# Schedule the script to run every 24 hours
schedule.every(24).hours.do(scrape_scholarships)

# Initial run
scrape_scholarships()

# Keep the script running to maintain the schedule
while True:
    schedule.run_pending()
    time.sleep(1)