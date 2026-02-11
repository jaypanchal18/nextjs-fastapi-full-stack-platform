from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    contents = relationship("Content", back_populates="owner")

class Content(Base):
    __tablename__ = 'contents'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    body = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship("User", back_populates="contents")

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")

def init_db():
    try:
        engine = create_engine(DATABASE_URL)
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Error initializing the database: {e}")

if __name__ == "__main__":
    init_db()