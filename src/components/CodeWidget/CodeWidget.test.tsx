import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeWidget } from './CodeWidget';

describe('CodeWidget', () => {
  const codeSnippet = 'const greet = () => "hello";';

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders title, language badge, and code lines', () => {
    render(
      <CodeWidget
        title="example.ts"
        language="typescript"
        code={codeSnippet}
        showLineNumbers
      />,
    );

    expect(screen.getByText('example.ts')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText(codeSnippet)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('copies code to clipboard on copy button click', async () => {
    render(<CodeWidget code={codeSnippet} showCopy />);

    const copyBtn = screen.getByRole('button', { name: 'Copy code' });
    await userEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeSnippet);
    expect(screen.getByText('✓ Copied')).toBeInTheDocument();
  });

  it('supports editable textarea mode', async () => {
    const handleChange = jest.fn();
    render(<CodeWidget code="let a = 1;" editable onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('let a = 1;');

    await userEvent.type(textarea, '2');
    expect(handleChange).toHaveBeenCalled();
  });

  it('triggers onAiGenerate callback on prompt submission', async () => {
    const handleAi = jest.fn().mockResolvedValue(undefined);
    render(<CodeWidget onAiGenerate={handleAi} />);

    const input = screen.getByLabelText('AI code generation prompt');
    await userEvent.type(input, 'quick sort in ts');

    const btn = screen.getByLabelText('Generate code');
    await userEvent.click(btn);

    expect(handleAi).toHaveBeenCalledWith('quick sort in ts');
  });
});

