import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../components/MyComponent';
import { fetchData } from '../api/data';

jest.mock('../api/data');

describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText(/my component/i)).toBeInTheDocument();
  });

  it('fetches data on button click', async () => {
    const mockData = { message: 'Hello World' };
    fetchData.mockResolvedValueOnce(mockData);

    render(<MyComponent />);
    userEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    fetchData.mockRejectedValueOnce(new Error('Fetch error'));

    render(<MyComponent />);
    userEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    expect(await screen.findByText(/fetch error/i)).toBeInTheDocument();
  });
});

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_create_item():
    response = client.post("/items/", json={"name": "Item 1"})
    assert response.status_code == 201
    assert response.json() == {"name": "Item 1"}

def test_create_item_invalid():
    response = client.post("/items/", json={"invalid_field": "Item 1"})
    assert response.status_code == 422

def test_get_item():
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"name": "Item 1"}

def test_get_item_not_found():
    response = client.get("/items/999")
    assert response.status_code == 404

import { exec } from 'child_process';

const runTests = () => {
  exec('npm test', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing tests: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Test stderr: ${stderr}`);
      return;
    }
    console.log(`Test stdout: ${stdout}`);
  });
};

runTests();