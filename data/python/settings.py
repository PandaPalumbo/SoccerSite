# settings.py
from dotenv import load_dotenv
load_dotenv()

# OR, the same with increased verbosity
load_dotenv(verbose=True)

# OR, explicitly providing path to '.env'
from pathlib import Path  # Python 3.6+ only
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

import os
HOST = os.getenv("HOST")
PW = os.getenv("PW")
USER = os.getenv("USER")
API_USER = os.getenv("API_USER")
API_TOKEN = os.getenv("API_TOKEN")