import requests
from langchain_core.tools import tool


@tool
def get_launches(limit: int = 5):
    """Fetch upcoming rocket launch events with provider, schedule, and location details."""
    base_url = f"https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit={limit}"

    try:
        response = requests.get(base_url)
        response.raise_for_status()
        data = response.json()

        launches = []

        for launch in data.get("results", []):
            launches.append({
                "name": launch.get("name"),
                "provider": launch.get("launch_service_provider", {}).get("name"),
                "window_start": launch.get("window_start"),
                "status": launch.get("status", {}).get("name"),
                "pad": launch.get("pad", {}).get("name"),
                "location": launch.get("pad", {}).get("location", {}).get("name"),
            })

        return {"event": "launch", "launches": launches}

    except requests.exceptions.RequestException as e:
        print(f"Error fetching launch data: {e}")
        return {"event": "launch", "error": str(e)}
    except Exception as e:
        print(f"Error parsing launch data: {e}")
        return {"event": "launch", "error": str(e)}