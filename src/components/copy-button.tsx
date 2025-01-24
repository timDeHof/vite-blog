import { useState } from "react";
import { Copy, Check } from "lucide-react";

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

// Enhanced Copy Button with better accessibility
const CopyButton = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			setError("Failed to copy");
			setTimeout(() => setError(null), 2000);
		}
	};

	return (
		<button
			onClick={copy}
			className={cn(
				"code-block-copy-button",
				copied ? "text-green-500" : undefined,
				error ? "text-red-500" : undefined,
			)}
			aria-label={error ? "Failed to copy" : copied ? "Copied!" : "Copy code"}
			title={error ? "Failed to copy" : copied ? "Copied!" : "Copy code"}>
			{error ? (
				"!"
			) : copied ? (
				<Check className='h-3.5 w-3.5' />
			) : (
				<Copy className='h-3.5 w-3.5' />
			)}
		</button>
	);
};
export default CopyButton;