"""Tests for the Quran API."""

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root():
    resp = client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_surahs"] == 114
    assert data["total_ayahs"] == 6236


def test_list_surahs():
    resp = client.get("/surahs")
    assert resp.status_code == 200
    surahs = resp.json()
    assert len(surahs) == 114
    assert surahs[0]["name_en"] == "Al-Fatihah"
    assert surahs[0]["verses"] == 7


def test_get_surah():
    resp = client.get("/surahs/1")
    assert resp.status_code == 200
    data = resp.json()
    assert data["name_en"] == "Al-Fatihah"

    resp = client.get("/surahs/999")
    assert resp.status_code == 404


def test_get_ayah():
    resp = client.get("/ayahs/1/1?lang=en")
    assert resp.status_code == 200
    data = resp.json()
    assert data["surah"] == 1
    assert data["ayah"] == 1
    assert len(data["arabic"]) > 0
    assert data["translation"] is not None


def test_get_surah_text():
    resp = client.get("/surah/1/text")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["verses"]) == 7


def test_search():
    resp = client.get("/search?q=mercy&lang=en")
    assert resp.status_code == 200
    data = resp.json()
    assert "results" in data


def test_reciters():
    resp = client.get("/reciters")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["reciters"]) >= 4


def test_names():
    resp = client.get("/names")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["names"]) == 99
