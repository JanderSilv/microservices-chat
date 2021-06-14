import { ChangeEvent, FormEvent, useState } from 'react';

interface IProps {
    sendMessage: (user: string, message: string) => void
}

const ChatInput = (props: IProps) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        }
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit} style={{ width: '50vw', margin: 'auto' }}>
                <label htmlFor="user">User:</label>
                <br />
                <input
                    id="user"
                    name="user"
                    value={user}
                    onChange={onUserUpdate} />
                <br />
                <label htmlFor="message">Message:</label>
                <br />
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={onMessageUpdate} />
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
    )
};

export default ChatInput;