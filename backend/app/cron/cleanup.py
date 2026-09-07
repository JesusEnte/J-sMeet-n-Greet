from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import select
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from core.db import engine
from models.db import Sessions

def setup():
    scheduler = BackgroundScheduler()
    scheduler.add_job(main, CronTrigger.from_crontab('0 0 * * *'))
    scheduler.start()
    
def main():
    #Cleans up sessions that weren't accessed for 30 days
    today = date.today()
    with Session(engine) as session:
        sessions = session.scalars(select(Sessions))
        for s in sessions:
            if (today - s.last_access).days > 30:
                session.delete(s)
        session.commit()
        