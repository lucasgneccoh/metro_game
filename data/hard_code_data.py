with open('cards_next_station_metro_only.txt', 'r') as f:
    for l in f:
        print(f'"{l.strip()}",')