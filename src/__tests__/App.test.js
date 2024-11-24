import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    test('renders the title bar with default app name', () => {
        render(<App />);
        expect(screen.getByText(/MSN Messenger/i)).toBeInTheDocument();
    });

    test('parses messages from XML and renders them in the ChatContainer', async () => {
        const { findByText, getByLabelText } = render(<App />);
        const mockFileContent = `
            <Messages>
                <Message DateTime="2024-01-01T12:00:00">
                    <From>
                        <User FriendlyName="Alice" />
                    </From>
                    <Text>Hello, World!</Text>
                </Message>
            </Messages>`;
        const file = new File([mockFileContent], 'Chat.xml', { type: 'text/xml' });
    
        const inputElement = getByLabelText(/Choose/i);
    
        await act(async () => {
            fireEvent.change(inputElement, { target: { files: [file] } });
        });
    
        expect(await findByText(/Hello, World!/i)).toBeInTheDocument();
    });

    test('parses messages from XML and renders them in the ChatContainer', async () => {
        const { findByText, getByLabelText } = render(<App />);
        const mockFileContent = `
            <Messages>
                <Message DateTime="2024-01-01T12:00:00">
                    <From>
                        <User FriendlyName="Alice" />
                    </From>
                    <Text>Hello, World!</Text>
                </Message>
                <Message DateTime="2024-01-01T12:05:00">
                    <From>
                        <User FriendlyName="Bob" />
                    </From>
                    <Text>Hi, Alice!</Text>
                </Message>
            </Messages>`;
        const file = new File([mockFileContent], 'Chat.xml', { type: 'text/xml' });
    
        const inputElement = getByLabelText(/Choose/i); // Assuming InputArea has a file input with this label
        fireEvent.change(inputElement, { target: { files: [file] } });
    
        // Wait for messages to render
        expect(await findByText(/Hello, World!/i)).toBeInTheDocument();
        expect(await findByText(/Hi, Alice!/i)).toBeInTheDocument();
    });

    test('displays last message date correctly', async () => {
        const { findByText, getByLabelText } = render(<App />);
        const mockFileContent = `
            <Messages>
                <Message DateTime="2024-01-01T12:00:00">
                    <From>
                        <User FriendlyName="Alice" />
                    </From>
                    <Text>Hello, World!</Text>
                </Message>
            </Messages>`;
        const file = new File([mockFileContent], 'Chat.xml', { type: 'text/xml' });
    
        const inputElement = getByLabelText(/Choose/i); // Assuming InputArea has a file input with this label
        fireEvent.change(inputElement, { target: { files: [file] } });
    
        // Custom matcher function to handle multiline text
        expect(
            await findByText((content, element) =>
                content.includes('Last message received at') &&
                content.includes('1/1/2024, 12:00:00 PM')
            )
        ).toBeInTheDocument();
    });

    test('handles empty XML gracefully', () => {
        const { queryByText, getByLabelText } = render(<App />);
        const mockFileContent = `<Messages></Messages>`;
        const file = new File([mockFileContent], 'EmptyChat.xml', { type: 'text/xml' });

        const inputElement = getByLabelText(/Choose/i); // Assuming InputArea has a file input with this label
        fireEvent.change(inputElement, { target: { files: [file] } });

        expect(queryByText(/Last message:/i)).not.toBeInTheDocument();
    });
});